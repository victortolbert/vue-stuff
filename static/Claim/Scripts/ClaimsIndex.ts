import { Component } from "vue-property-decorator";

import { EditFormBase } from "@ExemplarCommon/EditFormBase";
import VueLayoutComponent from "./../../../Views/Shared/LayoutComponents/VueLayoutComponent";
import Vue from "Vue";
import BaseButton from "@ExemplarComponents/Base/BaseButton";
import StateDropdownComponent from "@ExemplarComponents/Dropdowns/StateDropdownComponent";
import EditFormComponent from "@ExemplarComponents/EditFormComponent";
import { GlobalEvents, GlobalEventBus } from "@ExemplarCommon/eventBus";
import PhoneNumberComponent from "@ExemplarComponents/Controls/PhoneNumberComponent";
import BooleanComponent from "@ExemplarComponents/Controls/BooleanComponent";
import DropdownComponent from "@ExemplarComponents/Controls/DropdownComponent";
import NumericComponent from "@ExemplarComponents/Controls/NumericComponent";
import TextboxComponent from "@ExemplarComponents/Controls/TextboxComponent";
import CheckBoxComponent from "@ExemplarComponents/Controls/CheckBoxComponent";
import { ExemplarEntityTypes } from "@ExemplarEnums/ExemplarEntityTypes";
import { ExemplarPageRoutes } from "@ExemplarEnums/ExemplarPageRoutes";
import { BModal, BButton } from 'bootstrap-vue'
import { StateAbbreviationEnum } from "@ExemplarEnums/StateAbbreviationEnum";
import ProjectDamageTypeInsert from "@ExemplarViewModels/ProjectDamageTypeInsert";
import { IValidatorListAsync } from "@ExemplarInterfaces/IValidatorListAsync";
import { Customer } from "@ExemplarViewModels/Customer";
import { DropdownListValues } from "@ExemplarViewModels/DropdownListValues";
import { ApiResponse } from "@ExemplarDataAccess/ApiResponse";
import { ApiClient } from "@ExemplarDataAccess/ApiClient";
import ClaimValidationResult from "@ExemplarViewModels/ClaimValidationResult";
import ClaimValidationError from "@ExemplarViewModels/ClaimValidationError";
import { FailedFieldValues } from "@ExemplarViewModels/FailedFieldValues";
import { ExternalWebForm } from "@ExemplarViewModels/ExternalWebForm";
import DamageType from "@ExemplarViewModels/DamageType";

import { concat, forEach } from "lodash";
import CompanyDropdownComponent from "./ChildComponents/CompanyDropDown";
import TimeSlotDropdownComponent from "./ChildComponents/TimeSlotDropDown";
import WeatherWidget from "./ChildComponents/WeatherWidget";
import { lazyInject } from "../../Claim/Scripts/IocContainer";
import { ExternalClaimCompanyServiceType } from "@ExemplarViewModels/ExternalClaimCompanyServiceType";
import { CompanyServiceType } from "@ExemplarViewModels/CompanyServiceType";
import { ExternalClaimFormAdjuster } from "@ExemplarViewModels/ExternalClaimFormAdjuster";

import { DatePicker, DatePickerChangeEvent } from "@progress/kendo-vue-dateinputs";
import { ProjectInspection } from "../../../Scripts/ViewModels/ProjectInspection";
import StateUtilities from "../../../Scripts/Utilities/StateUtilities";
import { AvailableRoutes } from "../../../Scripts/ViewModels/AvailableRoutes";
import ServiceAreaPostalCode from "../../../Scripts/ViewModels/ServiceAreaPostalCode";
import { ToastrHelper } from "../../../Scripts/Common/ToastrHelper";

//interface CardholderInformation {
//    firstName: string,
//    lastName: string,
//    streetAddress: string,
//    streetAddress2: string,
//    city: string,
//    state: string,
//    zip: string,
//}

//interface PaymentInformation {
//    paymentAmount: number,
//    creditCardNumber: string,
//    creditCardExpirationMonth: string,
//    creditCardExpirationYear: string,
//    creditCardCCV: string,
//    creditCardHolderName: string,
//}

interface BillingInfo {
    FirstName: string,
    LastName: string,
    Company: string,
    Email: string,
    PhoneNumber: string,
    invoice: string,
    claims: string,
    notes: string,
    paymentProfile: PaymentProfile
}

interface PaymentProfile {
    paymentAmount: number,
    billTo: BillTo,
    payment: Payment
}

interface BillTo {
    FirstName: string,
    LastName: string,
    Address: string,
    //Address2: string,
    City: string,
    State: string,
    Zip: string,
    Country: string,
}

interface Payment {
    creditCard: CreditCard
}

interface CreditCard {
    CardNumber: string,
    ExpirationDate: string,
    cardCode: string,
    CardType: string,
}

@Component({
    template: "#claims-index",
    components: {
        BaseButton,
        BooleanComponent,
        BButton,
        BModal,
        CheckBoxComponent,
        CompanyDropdownComponent,
        DropdownComponent,
        DatePicker,
        EditFormComponent,
        NumericComponent,
        StateDropdownComponent,
        TextboxComponent,
        TimeSlotDropdownComponent,
        VueLayoutComponent,
        WeatherWidget,
        PhoneNumberComponent

    }
})

export default class ClaimsIndexComponent extends EditFormBase<ExternalWebForm> {
    @lazyInject("IValidatorListAsync<ExternalWebForm>")
    editFormValidator!: IValidatorListAsync<ExternalWebForm>;

    adjusterInCollections: boolean = false;

    appointmentDate: Date | null = null;

    appointmentMessage: string = '';

    catastrophicEventChoices: string[] = ["Yes", "No", "Unknown"];

    coordinatesUri: string;

    companyServiceTypes: CompanyServiceType[] = new Array<CompanyServiceType>();

    checkedPostalCode: string = '';

    claimFormat: string = '';

    detailsController = ExemplarPageRoutes.Claim;

    minDate = () => {
        const date = new Date();
        date.toLocaleString().split(",")[0];
        return date.setDate(date.getDate() + 1);
    }

    editModel: ExternalWebForm = new ExternalWebForm();

    adjusterId: number = $("#adjusterId").val() as number;
    fromPortal: string = $("#fromPortal").val() as string;
    //getCompanyServiceTrigger: boolean = false;

    displayStateFarmModal: boolean = false;
    stateFarmModalTitle: string = 'State Farm Single Sign On (SSO) required';
    stateFarmModalMessage: string = 'State Farm adjusters, please login through your State Farm system to submit claims.';
    customErrorMessage: string = 'We have encountered an error. Please try again later to call our Service center for assistance. We are sorry for the inconvience.';
    getCompanyServiceTypesUri: string;
    bindCompany: boolean = false;
    getCompanyUri: string = '';
    CatastrophicEvent: string = '';
    getTimeSlotsUri: string = '';
    // scheduleDate: string = '';
    googleMapsAdded: boolean = false;
    showCalender: boolean = false;
    IsAdditionalClaim: boolean = false;
    formSubmitted: boolean = false;
    autocomplete: google.maps.places.Autocomplete;
    formSuccessful: boolean = false;
    inspectionDate: Date | null = null;
    isClaimNumberInValid: boolean = true;
    isClaimNumberHasSpecialCharacter: boolean = true;
    invalidClaimMessage: string = '';
    SelectedServiceTypeIds: number[] = new Array<number>();
    showLoader: boolean = true;
    bindTimeSlot: boolean = false;
    isIndependentAdjuster: string = "";
    //startTime: string = "";
    otherCompanyName: string = "";
    otherCompanyServiceTypes: CompanyServiceType[] = [];
    pendingGet?: NodeJS.Timeout;
    showUnableToSaveErrorMessage: boolean = false;
    renderCompanyServiceTypeGrid: boolean = false;
    requiresDamageTypes: boolean = false;
    requiresDate: boolean = false;
    requiresPhone: boolean = false;
    saveRoute: string = '';
    selection: any = '';
    serviceAreaPostalCode: ServiceAreaPostalCode | null = null;
    serviceTypeDuration: number = 0;
    showAppointmentDatePicker: boolean = false;
    showDamageTypes: boolean = false;
    showOtherCarrierName: boolean = false;
    showTimeSlots: boolean = false;
    showAdjusterMessage: boolean = false;
    timeSlots: DropdownListValues[] = new Array<DropdownListValues>();
    latitude: number | null = null;
    longitude: number | null = null;
    validationRequirement: string = '';
    ValidationErrors: ClaimValidationError[] = new Array<ClaimValidationError>();
    addresses: any[] = []
    address: any = {
        street_number: null,
        route: '',
        locality: '',
        administrative_area_level_2:'',
        administrative_area_level_1: '',
        country: '',
        postal_code: '',
        latitude: '',
        longitude: ''
    }
    outOfCoverageModal = {
        open: false,
        text: "",
    }

    enteredPostalCode: string = "";

    directInspectionIds: number[] = new Array<number>();
    showDamageType: number[] = new Array<number>();
    showClaimSpecificEmailMessage: boolean = false;
    isCompanyUSAA: boolean = false;
    address1Field: HTMLInputElement;

    address2Field: HTMLInputElement;

    postalField: HTMLInputElement;

    showMobileMenu: boolean = false;

    updateMode: boolean = true

    showBillingInfo: boolean = false;

    //cardholder: CardholderInformation = {
    //    firstName: '',
    //    lastName: '',
    //    streetAddress: '',
    //    streetAddress2: '',
    //    city: '',
    //    state: '',
    //    zip: '',
    //}

    //paymentInfo: PaymentInformation = {
    //        paymentAmount: 0,
    //        creditCardNumber: '',
    //        creditCardExpirationMonth: '',
    //        creditCardExpirationYear: '',
    //        creditCardCCV: '',
    //        creditCardHolderName: '',
    //}

    billingInfo: BillingInfo = {
        FirstName: '',
        LastName: '',
        Company: '',
        Email: '',
        PhoneNumber: '',
        invoice: '',
        claims: '',
        notes: '',
        paymentProfile: {
            paymentAmount: 0,
            billTo: {
                FirstName: '',
                LastName: '',
                Address: '',
                //Address2: '',
                City: '',
                State: '',
                Zip: '',
                Country: ''
            },
            payment: {
                creditCard: {
                    CardNumber: '',
                    ExpirationDate: '',
                    cardCode: '',
                    CardType: ''
                }
            }
        }
    }

    termsAgree: boolean = true

    /* TODO
     $('#StreetAddress').change(function (e) {
        resetWeatherWidget(true);
        $("#AppointmentDate").val('');
    });
    $('#City').change(function (e) {
        resetWeatherWidget(true);
        $("#AppointmentDate").val('');
    });
    $('#StateID').change(function (e) {
        console.log('onchange => StateID');
        resetWeatherWidget(true);
        $("#AppointmentDate").val('');
    });
    $('#postalCode').change(function (e) {
        resetWeatherWidget(true);
        $("#AppointmentDate").val('');
    });

     * */
    constructor() {
        super();
        this.created();
    }

    billingResponse: any = null;

    mounted() {
        console.log("Claim Index Mounted. AdjusterId: " + this.adjusterId);
        var test = window.localStorage;
        GlobalEventBus.$off(GlobalEvents.CloseEditForm);
        GlobalEventBus.$on(GlobalEvents.CloseEditForm, () => {
            console.log("CloseEditForm");
        });

        this.apiEndpointName = ExemplarEntityTypes.ExternalWebForm;

        this.entityName = this.GetEntityNameByValue(this.apiEndpointName);

        this.saveRoute = `/Claim/Claims/SubmitClaim`;

        super.mounted();

        this.companyServiceTypes = [];

        if (this.adjusterId > 0) {
            //If adjuster is > 0, then the GetAdjuster callback will handle the binding of getCompanyUri
            this.editModel.FromPortal = (this.fromPortal.toLowerCase() === 'true');
            this.GetAdjuster();

        }
        else {
            //If no adjusterId, then get all companies
            this.getCompanyUri = `${this.exemplarCoreUrl}Claim/Claims/GetExternalFormCompanies`;
            this.bindCompany = true;
        }

        this.isInsert = true;
        this.isMounted = true;
        this.isPreSaveCallSuccess = false;

        const passwordInputElement = document.querySelector('#adjuster-email input');
        const confirmPasswordInputElement = document.querySelector('#confirm-email input');

        passwordInputElement?.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        confirmPasswordInputElement?.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        this.showOtherCarrierName = false;
        this.showAdjusterMessage = false;

        this.GetAdjusterInfo();

    }

    async submitClaim(event: any) {
        if (this.isClaimNumberHasSpecialCharacter) {
            ToastrHelper.DisplayToastWarning("No special characters or spaces should be entered in Claim Number.");
            return;
        }

        switch (this.CatastrophicEvent) {
            case "Yes":
                this.editModel.CatastrophicEvent = true;
                break;
            case "No":
                this.editModel.CatastrophicEvent = false;
                break;
            default:
                this.editModel.CatastrophicEvent = null;
        }

        await (this.$refs.editFormRef as EditFormComponent<ExternalWebForm>).Save();

        if (this.isCompanyUSAA == true) {
            this.editModel.ClaimSpecificEmail = this.editModel.ClaimSpecificEmail.trim();
            var regex = /^[a-z0-9-.]+@claims.usaa.com$/
            if (!regex.test(this.editModel.ClaimSpecificEmail.toLowerCase())) {
                this.showClaimSpecificEmailMessage = true;
                return;
            }
            else {
                this.showClaimSpecificEmailMessage = false;
            }
        }
    }

    created() {
        if (this.googleMapsAdded === false) {
            const script = document.createElement('script');
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBqNvN-IjKV-S8ItAz9B8Dy5K1U-XCcJu8&libraries=places&v=weekly";
            script.defer = true;
            document.body.appendChild(script);
            //script.onload = this.initAutocomplete;
            this.googleMapsAdded = true;
        }
    }

    initAutocomplete() {
        var test = document.getElementById("street-address1");

        this.address1Field = document.getElementById("street-address1") as HTMLInputElement;
        this.address2Field = document.getElementById("street-address2") as HTMLInputElement;
        this.postalField = document.getElementById("postal-code") as HTMLInputElement;

        this.autocomplete = new google.maps.places.Autocomplete(this.address1Field, {
            componentRestrictions: { country: ["us"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
        });

        this.autocomplete.addListener("place_changed", this.fillInAddress);
    }

    fillInAddress() {
        const place = this.autocomplete.getPlace();

        this.editModel.StreetAddress1 = "";
        this.editModel.PostalCode = "";

        if (place.geometry && place.geometry.location) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
        }

        for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    this.editModel.StreetAddress1 = `${component.long_name} ${this.editModel.StreetAddress1}`;
                    break;
                }

                case "route": {
                    this.editModel.StreetAddress1 += component.short_name;
                    break;
                }

                case "postal_code": {
                    this.editModel.PostalCode = `${component.long_name}${this.editModel.PostalCode}`;

                    break;
                }

                case "postal_code_suffix": {
                    this.editModel.PostalCode = (`${this.editModel.PostalCode}-${component.long_name}`);
                    break;
                }

                case "locality":
                    this.editModel.City = component.long_name;
                    break;

                case "administrative_area_level_1": {
                    this.editModel.StateId = StateUtilities.GetStateIdByAbbreviation(component.short_name) ?? 0;
                    break;
                }
            }
        }
        this.address2Field.focus();
        const zipRoute = `${this.exemplarCoreUrl}Claim/Claims/ValidatePostalCode?postalCode=${this.editModel.PostalCode}`;
        this.dataAccess.GetAsync(zipRoute, this.PostalCodeSuccessCallBack);
    }

    selectItem(item: any) {
        this.selection = item;
    }

    async GetAdjuster() {
        let route = `${this.exemplarCoreUrl}Claim/Claims/GetAdjusterById?adjusterId=${this.adjusterId}`;

        await this.GetModel(route, this.GetAdjusterSuccessfullCallback, null, false, true, this.customErrorMessage);
    }

    async GetServiceTypes() {
        let route = `${this.exemplarCoreUrl}Claim/Claims/GetExternalFormCompanyServiceTypes?companyId=${this.editModel.CompanyId}`;

        await this.GetModel(route, this.GetServiceTypesSuccessfullCallback, null, false, true, this.customErrorMessage);
    }

    FlashIncollectionsMethod() {
        this.formSubmitted = true;
        this.adjusterInCollections = true;
    }

    GetAdjusterSuccessfullCallback(model: any) {

        let externalClaimFormAdjuster: ExternalClaimFormAdjuster = model.Model;

        if (externalClaimFormAdjuster.UserId > 0) {

            if (externalClaimFormAdjuster.InCollections) {
                this.FlashIncollectionsMethod();
                return;
            }

            //this.editModel.CompanyName = externalClaimFormAdjuster.CompanyName;
            //this.editModel.CompanyId = externalClaimFormAdjuster.CompanyId;
            this.editModel.AdjusterFirstName = externalClaimFormAdjuster.FirstName;
            this.editModel.AdjusterLastName = externalClaimFormAdjuster.LastName;
            this.editModel.AdjusterEmail = externalClaimFormAdjuster.PrimaryEmail;
            this.editModel.AdjusterConfirmEmail = externalClaimFormAdjuster.PrimaryEmail;
            this.editModel.AdjusterPhone = externalClaimFormAdjuster.PrimaryPhone;
            this.editModel.AdjusterId = externalClaimFormAdjuster.UserId;
            this.companyServiceTypes = [];
            this.SelectedServiceTypeIds = [];
            //if(externalClaimFormAdjuster.ServiceTypes && externalClaimFormAdjuster.ServiceTypes.length && externalClaimFormAdjuster.ServiceTypes[0])
            //    this.companyServiceTypes = concat(this.companyServiceTypes, externalClaimFormAdjuster.ServiceTypes);

            if (externalClaimFormAdjuster.CompanyId === 0) {
                //if no company id, then this adjuster could not be found within any company, so just load all companies again
                this.getCompanyUri = `${this.exemplarCoreUrl}Claim/Claims/GetExternalFormCompanies`;

            }
            else {
                //If companyId is not 0, then we can send adjusterid to controller to get companies this adjuster is associated with. We also want non external form
                this.getCompanyUri = `${this.exemplarCoreUrl}Claim/Claims/GetExternalFormCompanies?adjusterId=${this.adjusterId}&OnExternalForm=false`;
            }

            this.bindCompany = false;
            this.$nextTick(() => {
                this.bindCompany = true;
            });

            this.showLoader = false;
        }
    }

    CheckIfAdjusterEmailMatches() {
        if (this.editModel.AdjusterEmail && this.editModel.AdjusterConfirmEmail) {
            if (this.editModel.AdjusterEmail.toLowerCase().trim() === this.editModel.AdjusterConfirmEmail.toLowerCase().trim()) {
                this.showAdjusterMessage = false;

                var editForm = this.$refs.editFormRef as EditFormComponent<ExternalWebForm>;
                if (editForm) {
                    var idx = editForm.validationResult.findIndex((x: string) => x === "Please confirm that the entered Adjuster's email matches in both text boxes.");
                    if (idx >= 0)
                        editForm.validationResult.splice(idx, 1);
                }


            }
            else {
                this.showAdjusterMessage = true;
            }
        }
        else
            this.showAdjusterMessage = false;
    }

    CreateExternalServiceType(companyServiceType: CompanyServiceType) : ExternalClaimCompanyServiceType {

        var externalClaimCompanyServiceType: ExternalClaimCompanyServiceType = new ExternalClaimCompanyServiceType();
        externalClaimCompanyServiceType.AvailableServiceTypeId = companyServiceType.AvailableServiceTypeId;
        externalClaimCompanyServiceType.AvailableServiceTypeName = companyServiceType.AvailableServiceTypeName;
        externalClaimCompanyServiceType.BillingPrice = companyServiceType.BillingPrice;
        externalClaimCompanyServiceType.CompanyId = companyServiceType.CompanyId;
        externalClaimCompanyServiceType.CustomerDescription = companyServiceType.Description;
        externalClaimCompanyServiceType.Duration = companyServiceType.Duration;
        externalClaimCompanyServiceType.LaborCost = companyServiceType.LaborCost;
        externalClaimCompanyServiceType.RequiresDate = companyServiceType.RequiresDate;

        return externalClaimCompanyServiceType;
    }

    ServiceTypeExists(availableServiceTypeId: number): boolean {

        if (this.SelectedServiceTypeIds.includes(availableServiceTypeId))
            return true
        else
            return false;
    }

    DamageTypeExists(damageTypeId: number): boolean {

        let damageType = this.editModel.SelectedDamageTypes.find((damageType: ProjectDamageTypeInsert) => damageType.DamageTypeId == damageTypeId);

        if (damageType)
            return true

        return false;
    }

    ProcessDamageTypes(damageTypeId: number) {

        let damageType = this.editModel.SelectedDamageTypes.find((damageType: ProjectDamageTypeInsert) => damageType.DamageTypeId == damageTypeId);

        if (damageType) {

            const index = this.editModel.SelectedDamageTypes.indexOf(damageType);
            this.editModel.SelectedDamageTypes.splice(index, 1);

        } else {
            let newDamageType: ProjectDamageTypeInsert = new ProjectDamageTypeInsert();
            newDamageType.DamageTypeId = damageTypeId;
            //newDamageType.ProjectId = this.editModel.ProjectId;
            newDamageType.OtherInspection = "";
            this.editModel.SelectedDamageTypes.push(newDamageType);
        }
    }

    GetOtherValue() {
        let damageType = this.editModel.SelectedDamageTypes.find((damageType: ProjectDamageTypeInsert) => damageType.DamageTypeId == 4);
        if (damageType)
            return damageType.OtherInspection;

        return "";
    }

    SetOtherValue(otherDesc: any) {
        let damageType = this.editModel.SelectedDamageTypes.find((damageType: ProjectDamageTypeInsert) => damageType.DamageTypeId == 4);
        if (damageType)
            damageType.OtherInspection = otherDesc;
    }

    getTimeSlots() {
        this.getTimeSlotsUri = this.exemplarApiUrl + "ExternalWebForm/GetTimeSlots?inspectionDate=" + this.editModel.AppointmentDate + "&serviceAreaId=" + this.editModel.ProjectInspection?.ServiceAreaId + "&duration=" + this.serviceTypeDuration + "&buffer=" + 30;
        this.showTimeSlots = true;
        this.bindTimeSlot = true;
     }

    RequestCoverage() {
        const requestCoverageRoute = `${this.exemplarApiUrl}RequestedPostalCodes`;
        let requestModel = {PostalCode: this.editModel.PostalCode}
        this.dataAccess.PostAsync(requestCoverageRoute, requestModel, this.RequestCoverageSuccessCallback, this.RequestCoverageErrorCallback);
    }

    async GetAdjusterInfo() {
        let url = `${this.exemplarApiUrl}PaymentGateway/GetCustomerProfile?id=72087`;
        this.billingResponse = await ApiClient.Get(url, this.accessToken);
        this.billingInfo = this.billingResponse.model;
    }

    /////////////////////////////////////////////////////////////////////////
    // Callbacks
    /////////////////////////////////////////////////////////////////////////

    RequestCoverageSuccessCallback(model: any) {
        ToastrHelper.DisplayToastSuccess("Successfully requested coverage for ZIP Code.");
        this.enteredPostalCode = '';
    }

    RequestCoverageErrorCallback(model: any) {
        this.enteredPostalCode = '';
    }

    RoutesAvailablitySuccessCallBack(event: AvailableRoutes) {
        if (event.AvailableRoutes === 0) {
            this.appointmentMessage = 'There are no available techs in the area.'
            this.showTimeSlots = false;
            this.editModel.ProjectInspection!.ScheduleDate = `${this.editModel.AppointmentDate} 0:00`;
            this.editModel.ProjectInspection!.ScheduleTime = '0:00';
            return;
        }

        this.getTimeSlots();
    }

    PreSaveCallback() {

        var canSave: boolean = true;
        //If the company selected is other and other service types were able to be found this will check to make sure the selected service type is a valid option for that companies service types.
        if (this.otherCompanyServiceTypes && this.otherCompanyServiceTypes.length > 0) {
            for (var companyServiceType of this.editModel.SelectedCompanyServiceTypes) {

                var idx = this.otherCompanyServiceTypes.findIndex((x: CompanyServiceType) => { return x.AvailableServiceTypeId === companyServiceType.AvailableServiceTypeId });
                if (idx < 0) {
                    this.showUnableToSaveErrorMessage = true;
                    canSave = false;
                    break;
                }
            }
        }
        this.isPreSaveCallSuccess = canSave;

    }

    PostalCodeSuccessCallBack(model: any) {

        if (model.Model == null) {
            this.serviceAreaPostalCode = this.serviceAreaPostalCode = null;
            this.editModel.IsInCoverageArea = false;
            this.showAppointmentDatePicker = false;
            this.ResetServiceTypes();
            this.outOfCoverageModal.open = true;
            return
        }

        this.serviceAreaPostalCode = model.Model;
        this.editModel.IsInCoverageArea = true;
        this.ResetServiceTypes();

    }

    PostalCodeErrorCallBack(model: any) {

        if (model.Model == null) {
            this.serviceAreaPostalCode = this.serviceAreaPostalCode = null;
            this.editModel.IsInCoverageArea = false;
            this.showAppointmentDatePicker = false;
            this.ResetServiceTypes();
            this.outOfCoverageModal.open = true;
            return
        }

        this.serviceAreaPostalCode = model.Model;
        this.editModel.IsInCoverageArea = true;
        this.ResetServiceTypes();
    }

    RedirectStateFarmUsers() {
        this.displayStateFarmModal = false;
        window.location.replace('https://hancockclaims.com');
    }

    ResetServiceTypes() {
        if (this.SelectedServiceTypeIds && this.SelectedServiceTypeIds.length > 0 && this.editModel.CompanyId) {

            const clonedServiceTypeIdChecked = this.SelectedServiceTypeIds.slice();
            clonedServiceTypeIdChecked.forEach((x: number) => {
                this.OnServiceTypeChecked(x);
                this.OnServiceTypeChecked(x);
            })
        }
    }

    TimeSlotSuccessfullCallBack(data: DropdownListValues[]) {
        this.bindTimeSlot = false;
        if (data.length == 0) {
            this.appointmentMessage = 'There are no times available. Please select a different date.'
            this.showTimeSlots = false;
            return;
        }


        forEach(data, (item: DropdownListValues) => {
            if (item.value.length == 3) {
                item.value = "0" + item.value;
            }
        });
        this.timeSlots = data;
        this.showTimeSlots = true;
        this.getTimeSlotsUri = "";
    }

    GetServiceTypesSuccessfullCallback(model: any) {
        this.companyServiceTypes = [];
        this.SelectedServiceTypeIds = [];
        this.companyServiceTypes = concat(this.companyServiceTypes, model.Model);
        this.directInspectionIds = [];
        this.showDamageTypes = false;

        let listOfServiceTypes = model.Model;

        listOfServiceTypes.forEach((value: any) => {
            if (value.AvailableServiceTypeName.toUpperCase().trim() == 'DIRECT INSPECTION' || value.AvailableServiceTypeName.toUpperCase().trim() == 'DIRECT INSPECT WITH HOVER COMPLETE') {
                this.directInspectionIds.push(value.AvailableServiceTypeId);
            }
        });
    }

    GetCompanyByNameCallback(model: any) {
        if (model.Model) {
            this.showOtherCarrierName = true;
            let company: Customer = model.Model;
            this.editModel.CompanyId = company.Id;
            this.otherCompanyServiceTypes = company.ServiceTypes;
            //this.companyServiceTypes = [];
            //this.companyServiceTypes = concat(this.companyServiceTypes, company.ServiceTypes);
        }
    }

    GetCompanyClaimFormatByNameCallback(model: any) {
        if (model.Model) {
            let company: Customer = model.Model;
            this.claimFormat = company.ClaimFormat;
            if (this.claimFormat)
                this.ValidateClaim();
        }
    }


    async SaveCallBack(model: any) {
        // const editComponent = this.$refs.editFormRef as EditFormComponent<ExternalWebForm>;

        if (model.Model.HasError == true) {

            if (model.Model.Error == FailedFieldValues.UserInCollection) {

                this.adjusterInCollections = true;
                this.formSubmitted = true;

                return;
            }
        }

        if (!this.IsAdditionalClaim) {
            this.formSubmitted = true;
            this.formSuccessful = true;
        }
        else {
            var href = this.exemplarCoreUrl + ExemplarPageRoutes.Claim + "?AdjusterId=" + model.Model.Project.AdjusterId + "&FromPortal=false";
            window.location.href = href
        }
        this.showLoader = false;
    }

    ParseAppointmentDateAndTime(selectedTime: string) {

        this.editModel.ProjectInspection!.ScheduleTime = selectedTime;

        var minutes: string = selectedTime.slice(2, 4);

        var hour: string = selectedTime.slice(0, 2);

        var scheduleDate = `${this.editModel.AppointmentDate} ${hour}:${minutes}`;

        this.appointmentDate = new Date(scheduleDate);

        this.editModel.ProjectInspection!.ScheduleDate = `${this.editModel.AppointmentDate} ${hour}:${minutes}`;
    }

    ResetValidationMessages() {
        var editForm = this.$refs.editFormRef as EditFormComponent<ExternalWebForm>;

        if (editForm)
            editForm.validationResult = [];

    }

    ValidateClaim() {

        if (this.claimFormat) {
            var [example, regex] = this.claimFormat.split('|');
            const claimRegEx = new RegExp(regex);

            if (this.editModel.ClaimNumber) {
                this.isClaimNumberInValid = !claimRegEx.test(this.editModel.ClaimNumber);
                if (this.isClaimNumberInValid)
                    this.invalidClaimMessage = `<p class="text-sm warning-orange p-4 rounded shadow mt-1">Alert! Please check the claim number you entered. It does not match the format used by <strong>${this.editModel.CompanyName}</strong>. Claim numbers can be entered in this format: <b>${example}</b>. Incorrect claim numbers will cause unnecessary service delays.</p>`;
            }
        }
        else {
            this.invalidClaimMessage = '';
            this.isClaimNumberInValid = false;
        }
    }

    /////////////////////////////////////////////////////////////////////////
    // EVENTS
    /////////////////////////////////////////////////////////////////////////

    OnTimeSlotChange(event: any) {

        if (event.sender.value() > 0) {

            this.ParseAppointmentDateAndTime(event.sender.value());
        }
    }

    OnAppointmentDateChange(event: DatePickerChangeEvent): void {
        this.appointmentMessage = "";

        this.appointmentDate = event.value;

        let inspectionDateString = event.value!.getFullYear() + "-" + (event.value!.getMonth() + 1) + "-" + event.value!.getDate();

        this.editModel.AppointmentDate = inspectionDateString;

        //@ts-ignore
        let year: string = this.appointmentDate.getFullYear().toString();

        //@ts-ignore
        if (this.editModel.AppointmentDate.length < 8 || year.length < 4) {
            return;
        }


        var minD: Date = new Date(this.minDate());
        minD.setDate(minD.getDate() - 1);
        //@ts-ignore
        if (new Date(this.editModel.AppointmentDate) < minD) {
            ToastrHelper.DisplayToastWarning("Please select a date greater than today", "Invalid Entry");
            return;
        }

        this.timeSlots = [];

        if (!this.editModel.ProjectInspection) {
            this.editModel.ProjectInspection = new ProjectInspection();
            this.editModel.ProjectInspection.CreatedBy = 9814;
            if (this.serviceAreaPostalCode) {
                this.editModel.ProjectInspection.ServiceRegionId = this.serviceAreaPostalCode.ServiceRegionId;
                this.editModel.ProjectInspection.ServiceAreaId = this.serviceAreaPostalCode.ServiceAreaId;
            }
        } else {
            this.editModel.ProjectInspection!.ScheduleTime = "";
        }

        if (this.editModel.ProjectInspection.ServiceAreaId > 0) {
            var zipRoute = this.exemplarApiUrl + "ExternalWebForm/AreRoutesAvailable?inspectionDate=" + this.editModel.AppointmentDate + "&serviceAreaId=" + this.editModel.ProjectInspection.ServiceAreaId;
            this.dataAccess.GetAsync(zipRoute, this.RoutesAvailablitySuccessCallBack);
        } else {
            this.appointmentMessage = "Out of coverage or missing address information. Cannot determine availability."
            this.editModel.ProjectInspection!.ScheduleDate = `${this.editModel.AppointmentDate} 0:00`;
        }
    }

    onClaimNumberChange(claimNumber: string) {

        this.editModel.ClaimNumber = claimNumber;
        var regexx = /^[A-Za-z0-9-.]+$/;
        if (!regexx.test(this.editModel.ClaimNumber)) {
            this.isClaimNumberInValid = true;
            this.invalidClaimMessage = `<p class="text-sm warning-orange p-4 rounded shadow mt-1">Alert! Please check the claim number you entered. No special characters or spaces should be entered in Claim Number. Incorrect claim numbers will cause unnecessary service delays.</p>`;
            this.isClaimNumberHasSpecialCharacter = true;
            return;
        } else {
            this.isClaimNumberHasSpecialCharacter = false;
            this.invalidClaimMessage = '';
            this.isClaimNumberInValid = true;
        }

        if (this.claimFormat)
            this.ValidateClaim();

    }

    OnPostalCodeChange() {
        //This is done to prevent the user from updating the zip code without clicking the button and getting the updated ZIP
        this.editModel.PostalCode = this.enteredPostalCode;

        if (this.editModel.ProjectInspection) {
            this.editModel.ProjectInspection = null;
        }

        this.appointmentMessage = ""
        this.editModel.AppointmentDate = "";
        this.showTimeSlots = false;
        this.appointmentDate = null;
        this.latitude = null;
        this.longitude = null;
        if (this.editModel.PostalCode.length < 5) {
            return;
        }
        const postalCodezipRoute = `${this.exemplarCoreUrl}Claim/Claims/ValidatePostalCode?postalCode=${this.editModel.PostalCode}`;
        this.dataAccess.GetAsync(postalCodezipRoute, this.PostalCodeSuccessCallBack, this.PostalCodeErrorCallBack);
    }

    OnServiceTypeChecked(availableServiceTypeId: number) {

        //reset validation messages if there are any so users won't be confused by required date validation message
        this.ResetValidationMessages();

        //Lets make sure these are all setup correctly
        this.showAppointmentDatePicker = false;
        this.showTimeSlots = false;
        this.appointmentDate = null
        this.editModel.AppointmentDate = '';
        this.editModel.ProjectInspection = null;

        if (this.SelectedServiceTypeIds.includes(availableServiceTypeId)) {


            var index = this.SelectedServiceTypeIds.indexOf(availableServiceTypeId);
            if (index !== -1) {
                this.SelectedServiceTypeIds.splice(index, 1);

                let serviceType = this.editModel.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.AvailableServiceTypeId == availableServiceTypeId);

                if (serviceType) {

                    const index = this.editModel.SelectedCompanyServiceTypes.indexOf(serviceType);
                    this.editModel.SelectedCompanyServiceTypes.splice(index, 1);

                }
            }
        } else {
            this.SelectedServiceTypeIds.push(availableServiceTypeId);
            let serviceType = this.companyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.AvailableServiceTypeId == availableServiceTypeId);

            if (serviceType) {

                this.editModel.SelectedCompanyServiceTypes.push(serviceType);
            }
        }

        let directInspection = this.directInspectionIds.includes(availableServiceTypeId)
        let ladderAssist = this.SelectedServiceTypeIds.includes(37)

        if (directInspection && !this.showDamageType.includes(availableServiceTypeId)) {
            this.showDamageType.push(availableServiceTypeId)
        }
        else if (directInspection && this.showDamageType.includes(availableServiceTypeId)){
            let index = this.showDamageType.indexOf(availableServiceTypeId);

            if (index > -1) {
                this.showDamageType.splice(index, 1)
            }
        }

        if (!ladderAssist && this.showDamageType.length > 0) {
            this.showDamageTypes = true;
        } else {
            this.editModel.SelectedDamageTypes = [];
            this.showDamageTypes = false;
        }

        var requiresDate = this.editModel.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.RequiresDate == true);
        var showCalendar = this.editModel.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.ShowCalendar == true);

        //Check if any service type requires phone. this will be used in edit form validator to determine if phone is necessary.
        this.editModel.RequiresPhone = this.editModel.SelectedCompanyServiceTypes.some((serviceType: CompanyServiceType) =>  serviceType.RequiresPhone === true );


        if (requiresDate && this.editModel.IsInCoverageArea) {
            this.serviceTypeDuration = requiresDate.Duration;
            this.validationRequirement = "(Required)";

        } else if (this.editModel.IsInCoverageArea === true) {
            this.validationRequirement = "(Optional)";
        }
        else {
            this.showAppointmentDatePicker = false;
        }

        if (showCalendar && this.editModel.IsInCoverageArea) {
            this.showAppointmentDatePicker = true;
        } else {
            this.showAppointmentDatePicker = false;
            this.showTimeSlots = false;
        }

        //if (this.serviceAreaPostalCode && (requiresDate || showCalendar)) {
        //    //Initialize Project Inspection
        //    this.editModel.ProjectInspection = new ProjectInspection();
        //    this.editModel.ProjectInspection.ServiceAreaId = this.serviceAreaPostalCode.ServiceAreaId;
        //    this.editModel.ProjectInspection.ServiceRegionId = this.serviceAreaPostalCode.ServiceRegionId;
        //    this.editModel.ProjectInspection.CreatedBy = 9814
        //}


        if (this.editModel.SelectedCompanyServiceTypes.length == 0) {
            this.appointmentDate = null;
            // this.showAppointmentDatePicker = false;
            this.editModel.ProjectInspection = null;
        }
    }

    OnIndependentAdjusterChange(value: string) {
        this.isIndependentAdjuster = value;
        this.editModel.IsIndependentAdjuster = value === "Yes";
    }

    OnStreetAddressChange(event: string) {
        this.editModel.StreetAddress1 = event;
        this.latitude = null;
        this.longitude = null;
        if (this.editModel.StreetAddress1.length > 3 && !this.autocomplete)
            this.initAutocomplete();
    }

    OnStateChange(e: any) {
        this.editModel.StateId = +e.value();
    }

    async OnOtherCompanyNameChange(event: any) {
        this.showUnableToSaveErrorMessage = false;
        this.editModel.CompanyName = event.target.value;
        let route = `${this.exemplarCoreUrl}Claim/Claims/GetCompanyByCompanyName?companyName=${this.editModel.CompanyName}`;
        await this.GetModel(route, this.GetCompanyByNameCallback, null, false);
    }

    async OnCompanyChange(e: any) {
        this.showLoader = false;

        if (e.sender.text().toUpperCase() == 'UNITED SERVICES AUTOMOBILE ASSOCIATION') {
            this.isCompanyUSAA = true;
        }
        else {
            this.isCompanyUSAA = false;
        }


        if (+e.sender.value() == 0)
            return;

        if (+e.sender.value() === 337 && this.editModel.FromPortal === false) {
            this.displayStateFarmModal = true;
            return;
        }


        this.companyServiceTypes = [];
        this.editModel.CompanyName = +e.sender.value() === 384 ? this.otherCompanyName : e.sender.text();
        this.editModel.CompanyId = +e.sender.value();


        this.isClaimNumberInValid = false;
        this.invalidClaimMessage = '';
        if (this.editModel.CompanyId === 384) {
            let route = `${this.exemplarCoreUrl}Claim/Claims/GetCompanyById?companyId=${this.editModel.CompanyId}`;
            await this.GetModel(route, this.GetCompanyClaimFormatByNameCallback, null, false, true, this.customErrorMessage);
        }
        else {
            this.showOtherCarrierName = false;
            this.otherCompanyServiceTypes = [];
            this.showUnableToSaveErrorMessage = false;
        }

        await this.GetServiceTypes();
    }

    ValidateClaimSpecificEmail() {
        if (this.editModel.ClaimSpecificEmail != null && this.editModel.ClaimSpecificEmail != '') {

            let email = this.editModel.ClaimSpecificEmail.toLowerCase().trim();
            var regex = /^[a-z0-9-.]+@claims.usaa.com$/

            if (!regex.test(email))
                this.showClaimSpecificEmailMessage = true;
            else
                this.showClaimSpecificEmailMessage = false;
        }
    }

    update() {
        this.updateMode = !this.updateMode
    }
}
