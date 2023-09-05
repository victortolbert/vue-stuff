using Exemplar.Services.DataAccessService;
using Exemplar.Services.ExemplarMessageService;
using Exemplar.Services.GoogleService;
using Exemplar.Services.Hover;
using Exemplar.Services.NewProjectService.Repos;
using Exemplar.Services.ProjectHistoryService;
using Exemplar.Services.ProjectNotificationHelper;
using Exemplar.Services.ServiceAreaCapacityHelpers;
using Exemplar.Services.Vip;

namespace Exemplar.Services.NewProjectService {
    public class NewProjectService {
        private NewClaimUserInputDto newClaimUserInput;
        private NewClaimWebFormDto newClaimWebForm;
        private NewClaimBaseDto newClaimBase;
        private ProjectInsertDto projectInsertDto = new ProjectInsertDto();
        private ClaimSubmittedResult claimSubmittedResult = new ClaimSubmittedResult();
        private ClaimValidationResult claimValidationResult = new ClaimValidationResult();
        private GeoLocationCoordinatesDto geoLocationCoordinatesDto;
        private ExternalClaimValidationErrorRepo externalClaimValidationErrorRepo;
        private UserHelper userHelper;

        // Repos
        private NewProjectCompanyRepo companyRepo;
        private readonly IHoverHelper hoverHelper;
        private ILocationServiceHelper locationServiceHelper;
        private readonly IExemplarMessageService exemplarMessageService;
        private readonly IVipHelper vipHelper;
        private readonly IProjectHistoryService projectHistoryService;
        private readonly IProjectNotificationHelper projectNotificationHelper;
        private NewProjectServiceRepo newProjectServiceRepo;
        private readonly NewProjectValidationHelper newClaimValidationHelper;
        private readonly ServiceAreaCapacityHelper serviceAreaCapacityHelper;
        private readonly ServiceAreaPostalCodeRepo serviceAreaPostalCodeRepo;
        public string googleApiKey;
        private int NewBillingContactId;
        private int CompanyBillingContactId;


        public NewProjectService(
          ServiceAreaPostalCodeRepo serviceAreaPostalCodeRepo,
          IHoverHelper hoverHelper,
          ILocationServiceHelper locationServiceHelper,
          IProjectHistoryService projectHistoryService,
          NewProjectCompanyRepo companyRepo,
          ExternalClaimValidationErrorRepo externalClaimValidationErrorRepo,
          NewProjectServiceRepo newProjectServiceRepo,
          IProjectNotificationHelper projectNotificationHelper,
          IExemplarMessageService exemplarMessageService,
          UserHelper userHelper,
          NewProjectValidationHelper newClaimValidationHelper,
          ServiceAreaCapacityHelper serviceAreaCapacityHelper,
          IVipHelper vipHelper
        ) {
            this.companyRepo = companyRepo;
            this.externalClaimValidationErrorRepo = externalClaimValidationErrorRepo;
            this.exemplarMessageService = exemplarMessageService;
            this.hoverHelper = hoverHelper;
            this.locationServiceHelper = locationServiceHelper;
            this.projectHistoryService = projectHistoryService;
            this.projectNotificationHelper = projectNotificationHelper;
            this.newClaimValidationHelper = newClaimValidationHelper;
            this.newProjectServiceRepo = newProjectServiceRepo;
            this.serviceAreaPostalCodeRepo = serviceAreaPostalCodeRepo;
            this.serviceAreaCapacityHelper = serviceAreaCapacityHelper;
            this.userHelper = userHelper;
            this.vipHelper = vipHelper;
        }

        public async Task<CoordinatesDto> GetCoordinatesAsync(
          string googleDirectionsApiKey,
          string street,
          string city,
          int stateId,
          string callSource,
          string stateAbbreviation = "",
          string postalCode = ""
        ) {
            try {
                geoLocationCoordinatesDto = await locationServiceHelper.GetLocationServicesAsync(
                  googleDirectionsApiKey,
                  newClaimBase.StreetAddress1,
                  newClaimBase.City,
                  newClaimBase.StateId.Value,
                  "NewProject",
                  postalCode: postalCode
                );

                if (geoLocationCoordinatesDto == null) {
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        "GeoCoordinates",
                        "Unable to retrieve address coordinates.",
                        string.Format(
                          "{0} {1}, {2}",
                          projectInsertDto.StreetAddress1,
                          projectInsertDto.City,
                          projectInsertDto.PostalCode
                        )
                      )
                    );
                } else {
                    projectInsertDto.AddressLatitude = geoLocationCoordinatesDto.AddressLatitude;
                    projectInsertDto.AddressLongitude = geoLocationCoordinatesDto.AddressLongitude;
                }
                if (geoLocationCoordinatesDto != null) {
                    return new CoordinatesDto
                    {
                        Latitude = (float)geoLocationCoordinatesDto.AddressLatitude,
                        Longitude = (float)geoLocationCoordinatesDto.AddressLongitude
                    };
                }
                else
                    return null;
            }
            catch
            {
                return null;
            }
        }

        private async Task<bool> ProcessWebFormTask() {
            newClaimWebForm = (NewClaimWebFormDto)newClaimBase;

            var companyDto = await ProcessExternalCompany();

            if (claimSubmittedResult.HasError)
                return false;

            if(projectInsertDto.CompanyId != 384) {
                var duplicateExists = await DuplicateClaimCheck(
                  projectInsertDto.ClaimNumber,
                  projectInsertDto.CompanyId.Value,
                  projectInsertDto.StreetAddress1,
                  projectInsertDto.City,
                  projectInsertDto.StateId,
                  projectInsertDto.PostalCode
                );

                if(duplicateExists == null)
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        "CLAIMNUMBER",
                        "Unable to determine if claim exists. Please check manually.",
                        newClaimWebForm.ClaimNumber
                      )
                    );

                else if (duplicateExists.Count > 0)
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        FailedFieldValues.DuplicateClaim,
                        "Company Claim already exists.",
                        newClaimWebForm.ClaimNumber
                      )
                    );

                var dataAccessResult = await companyRepo.GetAllCompanyServiceTypesAsync(projectInsertDto.CompanyId.Value);

                if (dataAccessResult.StatusCode.ToUpper() == "NOT FOUND") {
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        "CompanyServiceType",
                        "Company does not have any company service types.",
                        string.Empty
                      )
                    );
                }

                if (dataAccessResult.StatusCode.ToUpper() == "OK") {
                    // check to see if selected company service types are service types configured for the company.
                    var serviceTypes = dataAccessResult.Model;

                    foreach(var serviceType in newClaimBase.SelectedCompanyServiceTypes) {
                        if (!serviceTypes.Any(s => s.AvailableServiceTypeId == serviceType.AvailableServiceTypeId)) {
                            claimSubmittedResult.ValidationErrors.Add(
                              new ClaimValidationError(
                                "CompanyServiceType",
                                "Selected service type not configured for company",
                                serviceType.AvailableServiceTypeName
                              )
                            );
                        }
                    }
                }
            }

            if (newClaimBase.AdjusterId > 0) {
                projectInsertDto.AdjusterId = newClaimBase.AdjusterId;
            } else {
                claimSubmittedResult.ValidationErrors.AddRange(await ProcessAdjuster());

                if (claimSubmittedResult.HasError && claimSubmittedResult.Error == FailedFieldValues.UserInCollection)
                    return false;
            }

            if (newClaimWebForm.IsIndependentAdjuster)
                claimSubmittedResult.ValidationErrors.AddRange(await ProcessBillingContact());

            SetWebFormBillingContact();

            return true;
        }

        private bool ProcessUserTask() {
            //newClaimUserInput = (NewClaimUserInputDto)newClaimBase;

            SetUserInputBillingContact();

            return true;
        }

        public async Task<List<DuplicateCompanyClaimsDto>> DuplicateClaimCheck(
          string claimNumber,
          int companyId,
          string streetAddress1,
          string city,
          int stateId,
          string postalCode
        ) {
            return await newClaimValidationHelper.DuplicateClaimCheck(
              claimNumber,
              companyId,
              streetAddress1,
              city,
              stateId,
              postalCode
            );
        }

        public ClaimValidationResult ValidateClaim(NewClaimBaseDto newClaimBase) {
            this.newClaimBase = newClaimBase;

            // Validate Form
            List<ClaimValidationError> claimValidationError = newClaimValidationHelper.ValidateBase(newClaimBase);

            switch (newClaimBase.ProjectSourceId()) {
                case (int)ProjectSourceEnum.UserInput:

                    claimValidationError.AddRange(newClaimValidationHelper.ValidateUserInput((NewClaimUserInputDto)newClaimBase));
                    break;

                case (int)ProjectSourceEnum.ExternalForm:
                    claimValidationError.AddRange(newClaimValidationHelper.ValidateWebForm((NewClaimWebFormDto)newClaimBase));
                    break;

                default:
                    break;
            }

            claimValidationResult.ValidationErrors.AddRange(claimValidationError);

            if (claimValidationResult.ValidationErrors.Count > 0)
                claimValidationResult.ValidationPass = false;
            else
                claimValidationResult.ValidationPass = true;
            return claimValidationResult;
        }

        public async Task<DataAccessResult<ServiceAreaPostalCodeDto>> GetServiceAreaByPostalCode(string postalCode) {
            return await serviceAreaPostalCodeRepo.ValidatePostalCode(postalCode);
        }

        private async Task CallServiceAreaByPostalCode() {
            var dataAccessResult = await GetServiceAreaByPostalCode(projectInsertDto.PostalCode);

            if (dataAccessResult.StatusCode.ToUpper() == "NOT FOUND")
            {
                claimSubmittedResult.ValidationErrors.Add(new ClaimValidationError("ServiceAreaId", "Unable to determine Service Area Id from postal code.", projectInsertDto.PostalCode));
            }

            if (dataAccessResult.StatusCode.ToUpper() == "OK")
            {
                var model = dataAccessResult.Model;
                projectInsertDto.ProjectInspection.ServiceAreaId = model.ServiceAreaId;
                projectInsertDto.ProjectInspection.ServiceRegionId = model.ServiceRegionId;
            }
        }

        public async Task<ClaimSubmittedResult> ProcessClaimAsync(NewClaimBaseDto newClaimBase, string googleDirectionsApiKey, int currentUserId, string serviceAreaCapacityAlertRecipients, string vipEmailRecipients = "") {
            claimSubmittedResult.ValidationErrors.Clear();

            googleApiKey = googleDirectionsApiKey;

            if (googleDirectionsApiKey.Length == 0)
            {
                claimSubmittedResult.Error = "GoogleDirectionsApiKey not passed.";
                claimSubmittedResult.HasError = true;
                return claimSubmittedResult;
            }

            MapProjectInsertDto(currentUserId);

            //if (projectInsertDto.ProjectInspection != null)
            //{
            //    await CallServiceAreaByPostalCode();
            //}

            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.UserInput)
            {
                newClaimUserInput = (NewClaimUserInputDto)newClaimBase;
            }

            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.ExternalForm)
            {
                if (newClaimBase.FromPortal)
                {
                    projectInsertDto.ProjectSourceId = (int)ProjectSourceEnum.HancockPortal;
                }

                await ProcessWebFormTask();

                if (claimSubmittedResult.HasError)
                    return claimSubmittedResult;
            }
            else
            {
                ProcessUserTask();

                if (claimSubmittedResult.HasError)
                    return claimSubmittedResult;
            }

            // Get Address Coordinates

            await GetCoordinatesAsync(googleDirectionsApiKey, projectInsertDto.StreetAddress1, projectInsertDto.City, projectInsertDto.StateId, "NewProject", postalCode: projectInsertDto.PostalCode);

            if (claimSubmittedResult.ValidationErrors.Count > 0)
                this.projectInsertDto.ProjectStatusId = (int)ProjectStatusEnum.FailedValidation;

            var emergencyTarp = projectInsertDto.SelectedCompanyServiceTypes.FirstOrDefault(x => x.AvailableServiceTypeId == 42);

            if (emergencyTarp != null)
            {
                // Grab the 0-150 service Type

                if(projectInsertDto.CompanyId.HasValue && projectInsertDto.CompanyId.Value > 0)
                {
                    var zeroToOneFifty = await companyRepo.GetCompanyServiceTypeAsync(projectInsertDto.CompanyId.Value, 43);
                    if (zeroToOneFifty.Result && zeroToOneFifty.StatusCode.ToUpper() == "OK")
                    {
                        projectInsertDto.SelectedCompanyServiceTypes.Add(zeroToOneFifty.Model);
                        projectInsertDto.SelectedCompanyServiceTypes.Remove(emergencyTarp);
                    }
                }
            }

            var insertResult = await newProjectServiceRepo.InsertProject(projectInsertDto);
            if (!insertResult.Result)
            {
                claimSubmittedResult.HasError = true;
                claimSubmittedResult.Error = insertResult.ResultText;
                return claimSubmittedResult;
            }

            claimSubmittedResult.Project = insertResult.Model;

            //Log to ProjectHistory
            await projectHistoryService.InsertProjectHistory("Project created", claimSubmittedResult.Project.Id, claimSubmittedResult.Project.ProjectStatusId, currentUserId, false);

            //Process various services
            if (claimSubmittedResult.Project.HoverServiceTypesEnabled && claimSubmittedResult.Project.ProjectInspection != null && claimSubmittedResult.Project.ProjectInspection.ProjectInspectionTechnicianIds.Count > 0)
                await hoverHelper.HandleHover(claimSubmittedResult.Project, currentUserId);

            //52 = trip charge
            //53 = cancellation
            //82 = cancellation Fee
            //86 = tech req off
            //209 = 7. Cancellation Fee
            //210 = 7. Trip Charge
            List<int> excludedServiceTypeIds = new List<int>() {
                 52, 53, 82, 86, 209, 210
            };

            if(!claimSubmittedResult.Project.ServiceTypeIds.Any(x => excludedServiceTypeIds.Contains(x)))
            {
                //Send Project Created Notification
                await projectNotificationHelper.SendProjectCreatedNotification(claimSubmittedResult.Project.AdjusterEmail, claimSubmittedResult.Project.CompanyId, currentUserId, claimSubmittedResult.Project.Id, claimSubmittedResult.Project.ClaimSpecificEmail);

                if (claimSubmittedResult.Project.ProjectStatusId == (int)ProjectStatusEnum.Assigned)
                {
                    await projectNotificationHelper.SendInspectionAssignedNotification(claimSubmittedResult.Project.AdjusterEmail, claimSubmittedResult.Project.CompanyId, currentUserId, claimSubmittedResult.Project.Id, claimSubmittedResult.Project.ClaimSpecificEmail);

                }
                else if (claimSubmittedResult.Project.ProjectStatusId == (int)ProjectStatusEnum.Schedule)
                {
                    await projectNotificationHelper.SendInspectionScheduledNotification(claimSubmittedResult.Project.AdjusterEmail, claimSubmittedResult.Project.CompanyId, currentUserId, claimSubmittedResult.Project.Id, claimSubmittedResult.Project.ClaimSpecificEmail);
                }
            }

            if (claimSubmittedResult.ValidationErrors.Count > 0)
            {
                var errors = new List<ExternalClaimValidationError>();

                // Add validation errors to ExternalClaimValidationError
                foreach (var err in claimSubmittedResult.ValidationErrors)
                {
                    var externalClaimValidationError = new ExternalClaimValidationError();
                    externalClaimValidationError.CurrentValue = err.CurrentValue;
                    externalClaimValidationError.ProjectId = claimSubmittedResult.Project.Id;
                    externalClaimValidationError.FailedField = err.FailedField;
                    externalClaimValidationError.ValidationError = err.Error;
                    errors.Add(externalClaimValidationError);
                }

                await externalClaimValidationErrorRepo.InsertErrors(errors);
            }

            //Check if the service area is at capacity for inspections, and if so, send an email out to directors
            if (claimSubmittedResult.Project.ProjectInspection != null && claimSubmittedResult.Project.ProjectInspection.Id > 0)
            {
                var inspectionDateFull = await  serviceAreaCapacityHelper.IsInspectionDateFull(claimSubmittedResult.Project);

                if (inspectionDateFull)
                {
                    await serviceAreaCapacityHelper.SendEmail(claimSubmittedResult.Project, serviceAreaCapacityAlertRecipients);
                }

            }

            if (claimSubmittedResult.Project.IsVip && currentUserId > 0)
            {
                await vipHelper.HandleVipLogicForNewProject(claimSubmittedResult.Project, currentUserId, vipEmailRecipients);
            }

            claimSubmittedResult.ValidationErrors.RemoveAll(x => x.FailedField == FailedFieldValues.DuplicateClaim || x.FailedField == "CLAIMNUMBER");

            return claimSubmittedResult;
        }
        public async Task<DataAccessResult<CompanyDto>> GetCompanyByNameAsync(string companyName) {
            var dataAccessResult = await companyRepo.GetCompanyByNameAsync(companyName);

            if (dataAccessResult.StatusCode.ToUpper() == "OK")
            {
                dataAccessResult.Model.ServiceTypes.RemoveAll(x => x.OnExternalForm == false && x.BillingPrice == 0 && x.LaborCost == 0);
            }
            return dataAccessResult;
        }

        public async Task<DataAccessResult<List<DropDownListDto>>> GetExternalFormCompaniesAsync(int adjusterId = 0, bool onExternalForm = true) {
            var dataAccessResult = await companyRepo.GetCompaniesAsync(adjusterId, onExternalForm);

            return dataAccessResult;

        }

        public async Task<DataAccessResult<ExternalClaimFormAdjusterDto>> GetAdjuster(int adjusterId) {
            return await userHelper.GetAdjuster(adjusterId);
        }

        public async Task<DataAccessResult<CompanyDto>> GetCompanyByIdAsync(int companyId, bool forExternalForm) {
            var dataAccessResult = await companyRepo.GetCompanyByIdAsync(companyId);

            if (dataAccessResult.StatusCode.ToUpper() == "OK" && forExternalForm) {
                dataAccessResult.Model.ServiceTypes.RemoveAll(x => x.OnExternalForm == false && x.BillingPrice == 0 && x.LaborCost == 0);
            }

            return dataAccessResult;

        }

        public async Task<DataAccessResult<List<CompanyServiceTypeDto>>> GetCompanyServiceTypesAsync(int companyId) {
            return await companyRepo.GetCompanyServiceTypesAsync(companyId);
        }

        private int GetProjectStatusId(NewClaimBaseDto newClaimBase)
        {
            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.XactwareImport)
            {
                return (int)ProjectStatusEnum.Triage;
            }
            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.SymbilityImport)
            {
                return (int)ProjectStatusEnum.Pending;
            }

            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.ExternalForm)
            {
                return (int)ProjectStatusEnum.Pending;
            }

            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.UserInput)
            {
                if (newClaimBase.ProjectInspection != null && newClaimBase.ProjectInspection.ProjectInspectionTechnicianIds.Count == 0)
                {
                    return (int)ProjectStatusEnum.Schedule;
                }
                else if (newClaimBase.ProjectInspection != null && newClaimBase.ProjectInspection.ProjectInspectionTechnicianIds.Count > 0)
                {
                    return (int)ProjectStatusEnum.Assigned;
                }
                else
                {
                    var requiredScheduledServices = newClaimBase.SelectedCompanyServiceTypes.FirstOrDefault(st => st.RequiresDate == true);
                    return requiredScheduledServices != null ? (int)ProjectStatusEnum.Pending : (int)ProjectStatusEnum.CallQueue;
                }
            }

            return (int)ProjectStatusEnum.Pending;
        }

        private void SetWebFormBillingContact() {
            var companyFound = projectInsertDto.CompanyId == null
              ? false
              : projectInsertDto.CompanyId == 384
                ? false
                : true;

            if (newClaimWebForm.IsIndependentAdjuster) {
              projectInsertDto.BillingContactType = BillingContactTypeEnum.Other.ToString();
              projectInsertDto.BillingContactId = NewBillingContactId;

              return;
            }

            if (companyFound) {
                if (newClaimWebForm.AdjusterReceivesBill) {
                    projectInsertDto.BillingContactType = BillingContactTypeEnum.Adjuster.ToString();
                    projectInsertDto.BillingContactId = newClaimWebForm.AdjusterId;
                    return;
                } else {
                    // Company Billing Contact will be used and has already been set in ProcesCompany.
                    projectInsertDto.BillingContactType = BillingContactTypeEnum.BillingContact.ToString();
                    projectInsertDto.BillingContactId = CompanyBillingContactId;
                }
            } else {
                projectInsertDto.BillingContactId = newClaimWebForm.AdjusterId;
                projectInsertDto.BillingContactType = BillingContactTypeEnum.Adjuster.ToString();
                return;
            }

            return;
        }

        private void SetUserInputBillingContact() {
            if (newClaimUserInput.ProjectBillReceivedBy == BillingContactTypeEnum.Adjuster) {
                //  billing contact type has already has been set;
                projectInsertDto.BillingContactType = "Adjuster";
                projectInsertDto.BillingContactId = projectInsertDto.AdjusterId;
                return;
            }

            if (newClaimUserInput.ProjectBillReceivedBy == BillingContactTypeEnum.BillingContact) {
                //  billing contact type has already has been set;
                projectInsertDto.BillingContactType = "BillingContact";
                projectInsertDto.BillingContactId = projectInsertDto.BillingContactId;
                return;
            }

            if (newClaimUserInput.ProjectBillReceivedBy == BillingContactTypeEnum.Other) {
                //  billing contact type has already has been set;
                projectInsertDto.BillingContactType = "Other";
                projectInsertDto.BillingContactId = newClaimUserInput.BillingContactId;
                return;
            }
        }

        private async Task<CompanyDto> ProcessExternalCompany() {
            var dataAccessResult = new DataAccessResult<CompanyDto>();

            if (projectInsertDto.CompanyId == 384) {
                dataAccessResult = await companyRepo.GetCompanyByNameAsync(newClaimWebForm.CompanyName);

                if (
                  dataAccessResult.StatusCode.ToUpper() == "NOT FOUND"
                    || dataAccessResult.StatusCode.ToUpper() == "INTERNAL SERVER ERROR"
                ) {
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        FailedFieldValues.MissingCompanyId,
                        "Company not found.",
                        newClaimWebForm.CompanyName
                      )
                    );

                    return null;
                }
            } else {
                dataAccessResult = await companyRepo.GetCompanyByIdAsync(newClaimWebForm.CompanyId);

                if (
                  dataAccessResult.StatusCode.ToUpper() == "NOT FOUND"
                    || dataAccessResult.StatusCode.ToUpper() == "INTERNAL SERVER ERROR"
                ) {
                    claimSubmittedResult.ValidationErrors.Add(
                      new ClaimValidationError(
                        FailedFieldValues.MissingCompanyId,
                        "Company not found.",
                        newClaimWebForm.CompanyId.ToString()
                      )
                    );

                    return null;
                }
            }

            if (dataAccessResult.StatusCode.ToUpper() == "OK") {
                projectInsertDto.CompanyId = dataAccessResult.Model.Id;
                newClaimWebForm.AdjusterReceivesBill = dataAccessResult.Model.AdjusterReceivesBill;
                CompanyBillingContactId = dataAccessResult.Model.BillingContactId;
                projectInsertDto.RequiresHaagInspector = dataAccessResult.Model.RequiresHaag;
                return dataAccessResult.Model;
            }

            return null;
        }

        private async Task<List<ClaimValidationError>> ProcessAdjuster() {
            var processUserResult = await userHelper.ProcessUser(
              newClaimWebForm.AdjusterFirstName,
              newClaimWebForm.AdjusterLastName,
              newClaimWebForm.AdjusterEmail,
              newClaimWebForm.AdjusterPhone,
              newClaimWebForm.CompanyId,
              "AdjusterId"
            );

            var userDto = processUserResult.User;

            if (userDto == null) {
                // Server Error occurred while trying to
                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.AdjusterFirstNameRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.AdjusterFirstName
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.AdjusterLastNameRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.AdjusterLastName
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.AdjusterPhoneRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.AdjusterPhone
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.AdjusterEmailRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.AdjusterEmail
                  )
                );
            } else {
                projectInsertDto.AdjusterId = userDto.Id;

                if (userDto.IsInCollections.Value) {
                    await exemplarMessageService.InsertExceptionMessageAsync(
                      "Exemplar.Services.NewProjectService.NewProjectService",
                      "ProcessWebFormTask",
                      $"AdjusterEmail:{newClaimWebForm.AdjusterEmail} AdjusterPhone:{newClaimWebForm.AdjusterPhone} ClaimNumber:{newClaimWebForm.ClaimNumber} CompanyId:{newClaimWebForm.CompanyId}",
                      string.Empty,
                      "Claim cannot be accepted due to billing issue. Adjuster found in collections."
                    );

                    // Do not process claim since adjuser is in collections
                    claimSubmittedResult.HasError = true;
                    claimSubmittedResult.Error = FailedFieldValues.UserInCollection;
                }
            }
            return processUserResult.ClaimValidationErrors;
        }

        private async Task<List<ClaimValidationError>> ProcessBillingContact() {
            var processUserResult = await userHelper.ProcessUser(
              newClaimWebForm.BillingContactFirstName,
              newClaimWebForm.BillingContactLastName,
              newClaimWebForm.BillingContactEmail,
              newClaimWebForm.BillingContactPhone,
              newClaimWebForm.CompanyId,
              "BillingContactId"
            );

            var userDto = processUserResult.User;

            if (userDto == null) {
                // Server Error occurred while trying to
                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.BillingContactFirstNameRequired,
                    "Unable to verify billing contact due to server error.",
                    newClaimWebForm.BillingContactFirstName
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.BillingContactLastNameRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.BillingContactLastName
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.BillingContactPhoneRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.BillingContactPhone
                  )
                );

                claimSubmittedResult.ValidationErrors.Add(
                  new ClaimValidationError(
                    FailedFieldValues.BillingContactEmailRequired,
                    "Unable to verify adjuster due to server error.",
                    newClaimWebForm.BillingContactEmail
                  )
                );

            } else {
                NewBillingContactId = userDto.Id;
            }

            return processUserResult.ClaimValidationErrors;
        }

        private void MapProjectInsertDto(int currentUserId) {
            MapBase();

            if (newClaimBase.ProjectSourceId() == (int)ProjectSourceEnum.ExternalForm)
                MapWebForm();
            else
                MapUserInput(currentUserId);
        }

        private void MapBase() {
            projectInsertDto.AddressComments = newClaimBase.AddressComments;
            projectInsertDto.AddressLatitude = 1;
            projectInsertDto.AddressLongitude = 2;

            //projectInsertDto.AddressLatitude = geoLocationCoordinatesDto.AddressLatitude;
            //projectInsertDto.AddressLongitude = geoLocationCoordinatesDto.AddressLongitude;
            projectInsertDto.AdjusterAssignedOn = newClaimBase.AdjusterId.HasValue ? DateTime.Now : default;
            projectInsertDto.BillingStatusId = 0;
            projectInsertDto.CatastrophicEvent = newClaimBase.CatastrophicEvent;
            projectInsertDto.City = newClaimBase.City.ToUpper();
            projectInsertDto.ClaimNumber = newClaimBase.ClaimNumber;
            projectInsertDto.CreatedBy = newClaimBase.AdjusterId.HasValue ? newClaimBase.AdjusterId.Value : 9814;
            projectInsertDto.CompanyId = newClaimBase.CompanyId;

            projectInsertDto.InsuredEmail = newClaimBase.InsuredEmail.ToUpper();
            projectInsertDto.InsuredFirstName = newClaimBase.InsuredFirstName.ToUpper();
            projectInsertDto.InsuredLastName = newClaimBase.InsuredLastName.ToUpper();
            projectInsertDto.InsuredPrimaryPhone = newClaimBase.InsuredPrimaryPhone;
            projectInsertDto.IsReinspect = newClaimBase.IsReinspect.Value;
            projectInsertDto.PostalCode = newClaimBase.PostalCode;
            projectInsertDto.ProjectStatusId = GetProjectStatusId(newClaimBase);
            projectInsertDto.StateId = newClaimBase.StateId.Value;
            projectInsertDto.StreetAddress1 = newClaimBase.StreetAddress1.ToUpper();
            projectInsertDto.StreetAddress2 = newClaimBase.StreetAddress2.ToUpper();
            projectInsertDto.SelectedCompanyServiceTypes = newClaimBase.SelectedCompanyServiceTypes;
            projectInsertDto.SelectedDamageTypes = newClaimBase.SelectedDamageTypes;
            projectInsertDto.ProjectInspection = newClaimBase.ProjectInspection;
            projectInsertDto.MilitaryRankSalutation = newClaimBase.MilitaryRankSalutation;
            projectInsertDto.ClaimSpecificEmail = newClaimBase.ClaimSpecificEmail;
        }

        private void MapWebForm() {
            var newClaimWebForm = (NewClaimWebFormDto)newClaimBase;

            projectInsertDto.AddressComments = newClaimWebForm.AddressComments;
            projectInsertDto.CreatedBy = newClaimWebForm.AdjusterId.HasValue ? newClaimWebForm.AdjusterId.Value : 9814;
            projectInsertDto.IsIndependentAdjuster = newClaimWebForm.IsIndependentAdjuster;
            projectInsertDto.IsEscalation = false;
            projectInsertDto.IsInCoverageArea = newClaimBase.IsInCoverageArea;
            projectInsertDto.ProjectSourceId = newClaimWebForm.ProjectSourceId();
            projectInsertDto.AdjusterAssignedOn = DateTime.Now;
        }

        private void MapUserInput(int currentUserId) {
            var newUserInputProjectDto = (NewClaimUserInputDto)newClaimBase;

            projectInsertDto.AddressComments = newUserInputProjectDto.AddressComments;
            projectInsertDto.AdjusterId = newUserInputProjectDto.AdjusterId;
            projectInsertDto.BillingContactType = newUserInputProjectDto.BillingContactType.ToString();
            projectInsertDto.BillingContactId = newUserInputProjectDto.BillingContactId;
            projectInsertDto.ClaimComments = newUserInputProjectDto.ClaimComments;
            projectInsertDto.CreatedBy = currentUserId;
            projectInsertDto.CompanyId = newUserInputProjectDto.CompanyId;
            projectInsertDto.InsuredSecondaryPhone = newUserInputProjectDto.InsuredSecondaryPhone;
            projectInsertDto.IsMultipleAssign = newUserInputProjectDto.IsMultipleAssign.Value;
            projectInsertDto.Notes = newUserInputProjectDto.Notes;
            projectInsertDto.OtherServiceType = newUserInputProjectDto.OtherServiceType.Value;
            projectInsertDto.OtherServiceTypeDescription = newUserInputProjectDto.OtherServiceTypeDescription;
            projectInsertDto.OtherServiceTypePrice = newUserInputProjectDto.OtherServiceTypePrice;
            projectInsertDto.RequiresHaagInspector = newUserInputProjectDto.RequiresHaagInspector.Value;
            projectInsertDto.ProjectSourceId = newUserInputProjectDto.ProjectSourceId();
            projectInsertDto.IsEscalation = newUserInputProjectDto.IsEscalation;
            projectInsertDto.EscalationReasonTypeId = newUserInputProjectDto.EscalationReasonTypeId;
        }
    }
}
