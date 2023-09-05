namespace Exemplar.Web.Areas.ServiceType.Controllers {
    [Area(ExemplarWebAreas.Claim)]
    public class ClaimsController : BaseController {
        private readonly NewProjectService newProjectService;
        private string serviceAreaCapacityAlertRecipients;
        private string vipEmailRecipients;

        public ClaimsController(
          IExemplarMessageService exemplarMessageService,
          IOptions<AppSettings> appSettings,
          IConfiguration configuration,
          IHttpClientFactory httpClientFactory,
          NewProjectService newProjectService
        ) : base(httpClientFactory, exemplarMessageService, configuration, appSettings) {
            httpClientFactory = httpClientFactory
              ?? throw new ArgumentNullException(nameof(httpClientFactory));

            this.newProjectService = newProjectService;

            serviceAreaCapacityAlertRecipients = configuration["ServiceAreaCapacityAlertRecipients"]
              ?? configuration.GetValue<string>("AppSettings:ServiceAreaCapacityAlertRecipients");

            vipEmailRecipients = configuration["vipEmailRecipients"]
              ?? configuration.GetValue<string>("AppSettings:vipEmailRecipients");
        }

        [Route("Claims")]
        public IActionResult Index(int adjusterId = 0, bool fromPortal = false) {
            ViewData["ExemplarApiUrl"] = ExemplarApiUrl;
            ViewData["ExemplarCoreUrl"] = ExemplarCoreUrl;
            ViewData["AdjusterId"] = adjusterId;
            ViewData["FromPortal"] = fromPortal;

            // if (CurrentUser.IsAuthenticated && CurrentUser.IsAuthorized) {
            var aToken = GetAccessToken();
            ViewData["AccessToken"] = aToken.Result;
            // }

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetExternalFormCompanies(int adjusterId = 0, bool onExternalForm = true) {
            var dataAccessResult = await newProjectService.GetExternalFormCompaniesAsync(adjusterId, onExternalForm);

            return Json(dataAccessResult.Model);
        }

        [HttpGet]
        public async Task<IActionResult> GetExternalFormCompanyServiceTypes(int companyId) {
            if (companyId == 0)
                return Json(string.Empty);

            var dataAccessResult = await newProjectService.GetCompanyServiceTypesAsync(companyId);

            return Json(dataAccessResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdjusterById(int adjusterId) {
            var dataAccessResult = await newProjectService.GetAdjuster(adjusterId);

            return Json(dataAccessResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyByCompanyName(string companyName) {
            var dataAccessResult = await newProjectService.GetCompanyByNameAsync(companyName);

            return Json(dataAccessResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyById(int companyId) {
            var dataAccessResult = await newProjectService.GetCompanyByIdAsync(companyId, true);

            return Json(dataAccessResult);
        }

        [HttpGet]
        public async Task<IActionResult> ValidatePostalCode(string postalCode) {
            if (string.IsNullOrWhiteSpace(postalCode) || postalCode.Length < 5)
                return Json(string.Empty);

            var dataAccessResult = await newProjectService.GetServiceAreaByPostalCode(postalCode.Substring(0,5));

            return Json(new DataAccessResult<ServiceAreaPostalCodeDto>(true, dataAccessResult.Model, string.Empty, "OK"));
        }

        [HttpPost]
        public async Task<IActionResult> SubmitClaim([FromBody] string model) {
            try {
                var newClaimWebFormDto = JsonConvert.DeserializeObject<NewClaimWebFormDto>(model);

                var claimValidationResult = newProjectService.ValidateClaim(newClaimWebFormDto);

                if (claimValidationResult.ValidationPass) {
                    //Default user for external claims
                    int userId = 9814;

                    //if (CurrentUser.IsAuthorized)
                    //    userId = CurrentUser.UserId;

                    var claimSubmittedResult = await newProjectService.ProcessClaimAsync(
                      newClaimWebFormDto,
                      GoogleDirectionsApiKey,
                      userId,
                      serviceAreaCapacityAlertRecipients,
                      vipEmailRecipients
                    );

                    return Json(new DataAccessResult<ClaimSubmittedResult>(true, claimSubmittedResult, string.Empty, "OK"));
                }

                else {
                    return Json(new DataAccessResult<ClaimValidationResult>(true, claimValidationResult, string.Empty, "OK"));
                }

                // if (claimSubmittedResult.HasError)
                //    // TODO: Type of error?
                //    return Json(new DataAccessResult<string>(false, claimSubmittedResult.Error, string.Empty, "OK"));
                // }
            }

            catch (Exception ex) {
                await ExemplarMessageService.InsertExceptionMessageAsync(
                  GetType().ToString(),
                  GetCurrentMethod(),
                  string.Empty,
                  string.Empty,
                  ex
                );

                return this.StatusCode(500, ex.Message);
            }
        }
    }
}
