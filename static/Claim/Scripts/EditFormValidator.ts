import { injectable } from "inversify";
import { IValidatorListAsync } from "@ExemplarInterfaces/IValidatorListAsync";
import { ExternalWebForm } from "@ExemplarViewModels/ExternalWebForm";
import { CompanyServiceType } from "@ExemplarViewModels/CompanyServiceType";
import ProjectDamageTypeInsert from "@ExemplarViewModels/ProjectDamageTypeInsert";

import DataAccess from "@ExemplarCommon/DataAccess";
import { ClaimRoute } from "@ExemplarRoutes/ClaimRoute";
import $ from "jquery";
import ValidationUtilities from "../../../Scripts/Utilities/ValidationUtilities";

@injectable()
export class EditFormValidator implements IValidatorListAsync<ExternalWebForm> {

    exemplarApiUrl: string = $("#exemplarApiUrl").val() as string;
    accessToken: string = $("#accessToken").val() as string;
    dataAccess: DataAccess = new DataAccess(this.accessToken);
    claimRoute: ClaimRoute = new ClaimRoute(this.exemplarApiUrl);
    customerList: boolean = false;
    validator = new Array<string>();

    async Validate(model: ExternalWebForm): Promise<string[]> {
        this.validator = [];
       
        if (!model.AdjusterEmail) {
            this.validator.push("Please enter an Adjuster Email.");
        }
        else if (model.AdjusterEmail.toLowerCase().trim() !== model.AdjusterConfirmEmail.toLowerCase().trim()) {
            this.validator.push("Please confirm that the entered Adjuster's email matches in both text boxes.")
        }

        if (model.IsReinspect===null) {
            this.validator.push("Please indicate if this is a re-inspection.");
        }

        if (!model.AdjusterFirstName) {
            this.validator.push("Please enter an Adjuster First Name.");
        }

        if (!model.AdjusterLastName) {
            this.validator.push("Please enter an Adjuster Last Name.");
        }

        if (!model.AdjusterPhone || ValidationUtilities.ValidatePhoneNumber(model.AdjusterPhone) === false) {
            this.validator.push("Please enter an Adjuster Phone Number.");
        }

        if (!model.City) {
            this.validator.push("Please enter in a City.");
        }

        if (!model.ClaimNumber) {
            this.validator.push("Please enter in a ClaimNumber.");
        }

        if (!model.CompanyId) {
            this.validator.push("Please select a Company.");
        }

        if (model.CompanyId === 384 && !model.CompanyName) {
            this.validator.push("When OTHER COMPANY is selected, company name must be provided.");
        }

        if (!model.InsuredFirstName) {
            this.validator.push("Please enter an Insured First Name.");
        }

        if (!model.InsuredLastName) {
            this.validator.push("Please enter an Insured Last Name.");
        }

        if (model.RequiresPhone && (!model.InsuredPrimaryPhone || ValidationUtilities.ValidatePhoneNumber(model.InsuredPrimaryPhone) === false )) {
            this.validator.push("Please enter a Phone Number for the insured.");
        }

        if (!model.PostalCode) {
            this.validator.push("Please enter in a Postal Code.");
        }

        if (!model.SelectedCompanyServiceTypes?.length) {
            this.validator.push("Please select a Service Type.");
        }

        if (!model.StreetAddress1) {
            this.validator.push("Please enter in a Street Address.");
        }

        if (!model.StateId) {
            this.validator.push("Please select a State.");
        }

        this.CheckProjectInspection(model);
        this.CheckDamageTypes(model);
       
        if (model.IsIndependentAdjuster) {
            if (!model.BillingContactFirstName)
                this.validator.push("When IS INDEPENDENT ADJUSTER is selected, Billing Contact First Name is required.");
            if (!model.BillingContactLastName)
                this.validator.push("When IS INDEPENDENT ADJUSTER is selected, Billing Contact Last Name is required.");
            if (!model.BillingContactEmail)
                this.validator.push("When IS INDEPENDENT ADJUSTER is selected, Billing Contact Email Name is required.");
            if (!model.BillingContactPhone)
                this.validator.push("When IS INDEPENDENT ADJUSTER is selected, Billing Contact Phone Name is required.");
        }

        if (model.CompanyName.toUpperCase() == 'UNITED SERVICES AUTOMOBILE ASSOCIATION' && !model.ClaimSpecificEmail){
            this.validator.push("Please enter a Claim Specific Email")
        }

        return new Promise<string[]>((resolve) => {
            resolve(this.validator);
        });
    }

    CheckProjectInspection(model: ExternalWebForm) {

        var requiresDate = model.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.RequiresDate == true);

        if (requiresDate && model.IsInCoverageArea) {

            if (!model.ProjectInspection) {
                this.validator.push("Please indicate the Appointment Date.");
                return;
            }
        } 

        if (model.ProjectInspection && model.AppointmentDate.length > 0 && model.IsInCoverageArea === true) {
            if (model.PostalCode.length > 0 && model.ProjectInspection!.ScheduleTime.length == 0) {
                this.validator.push("Please indicate the Start Time.");
            }
        }
    }

    CheckDamageTypes(model: ExternalWebForm) {

        let directInspectionSelected: boolean = false;
        let ladderAssistSelected: boolean = false;

        let serviceType = model.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.AvailableServiceTypeId == 39);

        if (serviceType)
            directInspectionSelected = true;

        serviceType = model.SelectedCompanyServiceTypes.find((serviceType: CompanyServiceType) => serviceType.AvailableServiceTypeId == 37);

        if (serviceType)
            ladderAssistSelected = true;

        if (directInspectionSelected && !ladderAssistSelected) {
            if (model.SelectedDamageTypes.length === 0) {
                this.validator.push("Please select a Damage Type.");
            } else {

                let damageType = model.SelectedDamageTypes.find((damageType: ProjectDamageTypeInsert) => damageType.DamageTypeId == 4 && damageType.OtherInspection.length == 0);

                if (damageType) {
                    this.validator.push("Please indicate the other damage.");
                }
            }
        }
    }

    async checkServiceRegionNameForUniqueness(model: ExternalWebForm) {

        //const entityId = model.Id === null ? 0 : Number(model.Id);
        const url = this.claimRoute.getCustomers(2);
        await this.dataAccess.GetAsync(url, (data: any) => {
            this.customerList = data.ExistingValueFound;
        });
    }
}
