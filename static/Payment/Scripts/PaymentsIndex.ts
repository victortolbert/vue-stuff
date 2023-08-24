import { Component, Vue } from 'vue-property-decorator'
import { PageBase } from "@ExemplarCommon/PageBase";
import { ExemplarPageRoutes } from "@ExemplarEnums/ExemplarPageRoutes";
import { PaymentRoute } from "@ExemplarRoutes/PaymentRoute";
import DataAccess from "@ExemplarCommon/DataAccess";
import { ApiClient } from "@ExemplarDataAccess/ApiClient";
import { ResponseType } from "@ExemplarEnums/ResponseType";
import { ApiResponse } from "@ExemplarDataAccess/ApiResponse";

import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { ExemplarEntityTypes } from "@ExemplarEnums/ExemplarEntityTypes";
import { PaymentProfile } from '@ExemplarViewModels/PaymentProfile';
import { Form } from '@progress/kendo-vue-form';
import { cloneDeep } from 'lodash';


interface Form {
    Id: number | string,
    FirstName: string,
    LastName: string,
    Company: string,
    Email?: string,
    PhoneNumber: string,
    invoice?: string,
    claims?: string,
    notes?: string,
    IsProfileExist: boolean,
    IsPaymentUpdated: boolean,
    ExpMonth?: string[],
    ExpYear?: string[],
    PaymentProfile: PaymentProfile
}

extend('email', email);
extend('required', required);

@Component({
    template: '#payments-index',
})
export default class PaymentsIndexComponent extends PageBase<null> {
    constructor() {
        super();
    }

    updateMode: boolean = false;

    newEntry: boolean = false;
    newCCEntry: boolean = false;

    confirmMessage: boolean = false

    activeStep: string = 'adjusterInformation'

    steps: string[] = [
        'adjusterInformation',
        'cardholderInformation',
        'paymentInformation'
    ]

    monthOptions: any[] = [
        'XX', '01', '02', '03', '04', '05', '06',
        '07', '08', '09', '10', '11', '12',
    ]

    yearOptions: any[] = [
        'XXXX', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'
    ]

    paymentRoute: PaymentRoute;

    form: Form = {
        Id: 0,
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Company: "",
        IsProfileExist: false,
        IsPaymentUpdated: false,
        PaymentProfile: {
          BillTo: {
            FirstName: "",
            LastName: "",
            Company: "",
            Address: "",
            City: "",
            State: "",
            Zip: "",
            Country: "",
            PhoneNumber: "",
            FaxNumber: null
          },
          Payment: {
            CreditCard: {
              CardNumber: "",
              ExpirationDate: "",
              ExpirationMonth: "",
              ExpirationYear: "",
              CardCode: "",
              CardType: "",
              IssuerNumber: ""
            }
          },
          DefaultPaymentProfile: false,
          CustomerProfileId: "",
          CustomerPaymentProfileId: "",
          OriginalNetworkTransId: "",
          OriginalAuthAmount: ""
        }
    }

    cachedForm: any = {}

    async created() {
        console.log("Payment component created.");

    }

    async mounted() {
        console.log('Payments Mounted.');
        // let url = `${this.exemplarApiUrl}PaymentGateway/GetCustomerProfile?id=${this.currentUser.UserId}`
        // let url = `${this.exemplarApiUrl}PaymentGateway/GetCustomerProfile?id=72087`
        let url = `${this.exemplarApiUrl}PaymentGateway/GetCustomerProfile?id=71062`
        const { model } = await (await ApiClient.Get(url, this.accessToken));
        this.form = model;
        if (!this.form.IsProfileExist) {
            this.newEntry = true;
        }
        this.form.Id = this.currentUser.UserId;
        this.cachedForm = cloneDeep(this.form);
    }


    async onSubmit() {
        try {
            let url = `${this.exemplarApiUrl}PaymentGateway/ChargeCustomerProfile`;
            const { model } = await (await ApiClient.Post(url, this.form, this.accessToken));
            console.log(model);

            if (model.IsSuccess) {
                this.confirmMessage = true;
            }
            else {
                this.confirmMessage = false;
            }

        }
        catch (error) {
            console.error(error) // from creation or business logic
            this.confirmMessage = false
        }

    }

    update() {
        this.form.PaymentProfile.Payment = {
            CreditCard: {
                CardNumber: "",
                ExpirationMonth: "",
                ExpirationYear: "",
                CardCode: "",
                CardType: "",
                IssuerNumber: ""
            }
        }
        this.updateMode = true;
    }

    updateCardholderInformation() {
        this.updateMode = true;
    }

    updatePaymentInformation() {
        this.form.PaymentProfile.Payment = {
            CreditCard: {
                CardNumber: "",
                ExpirationMonth: "",
                ExpirationYear: "",
                CardCode: "",
                CardType: "",
                IssuerNumber: ""
            }
        }
        this.updateMode = true;
    }

    cancelBillToInfo() {
        this.form = cloneDeep(this.cachedForm)
        this.updateMode = false;
    }

    saveBillToInfo() {

        this.updateMode = false;
        this.newCCEntry = true;

        this.form.PaymentProfile.Payment = {
            CreditCard: {
                CardNumber: "",
                ExpirationMonth: "",
                ExpirationYear: "",
                CardCode: "",
                CardType: "",
                IssuerNumber: ""
            }
        }
        this.cachedForm = cloneDeep(this.form);
        this.form.IsPaymentUpdated = true;
    }
}
