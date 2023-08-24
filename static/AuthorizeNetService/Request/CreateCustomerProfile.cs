using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Exemplar.Domain;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class CreateCustomerProfile
    {
        //[JsonProperty("createCustomerProfileRequest")]
        //public CreateCustomerProfileRequest createCustomerProfileRequest { get; set; }
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Company { get; set; }
        public PaymentProfile PaymentProfile { get; set; }
    }

    public class CreateCustomerProfileAuthorizeRequest
    {
        [JsonProperty("createCustomerProfileRequest")]
        public CreateCustomerProfileRequest createCustomerProfileRequest { get; set; }
    }

    public class UpdateCustomerPaymentProfileAuthorizeRequest
    {
        [JsonProperty("updateCustomerPaymentProfileRequest")]
        public UpdateCustomerPaymentProfileRequest updateCustomerPaymentProfileRequest { get; set; }
    }

    public class CreateCustomerProfileRequest
    {
        [JsonProperty("merchantAuthentication")]
        public MerchantAuthentication MerchantAuthentication { get; set; }

        [JsonProperty("profile")]
        public Profile Profile { get; set; }

        [JsonProperty("validationMode")]
        public string ValidationMode { get; set; }
    }


    public class Profile
    {
        [JsonProperty("merchantCustomerId")]
        public string MerchantCustomerId { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("paymentProfiles")]
        public PaymentProfile PaymentProfiles { get; set; }
    }

    public class PaymentProfile
    {
        [JsonProperty("customerType")]
        public string CustomerType { get; set; }
        [JsonProperty("billTo")]
        public BillTo BillTo { get; set; }
        [JsonProperty("payment")]
        public Payment Payment { get; set; }
        [JsonProperty("defaultPaymentProfile")]
        public bool DefaultPaymentProfile { get; set; }

//        [JsonProperty("customerPaymentProfileId")]
        //public string CustomerPaymentProfileId { get; set; }
    }

    public class UpdatePaymentProfile
    {
        [JsonProperty("customerType")]
        public string CustomerType { get; set; }
        [JsonProperty("billTo")]
        public BillTo BillTo { get; set; }
        [JsonProperty("payment")]
        public Payment Payment { get; set; }
        [JsonProperty("defaultPaymentProfile")]
        public bool DefaultPaymentProfile { get; set; }
        [JsonProperty("customerPaymentProfileId")]
        public string CustomerPaymentProfileId { get; set; }
    }

    public class BillTo
    {
        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("company")]
        public string Company { get; set; }

        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("state")]
        public string State { get; set; }

        [JsonProperty("zip")]
        public string Zip { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("phoneNumber")]
        public string PhoneNumber { get; set; }
    }

    public class Payment
    {
        [JsonProperty("creditCard")]
        public CreditCard CreditCard { get; set; }
    }

    public class CreditCard
    {
        [JsonProperty("cardNumber")]
        public string CardNumber { get; set; }

        [JsonProperty("expirationDate")]
        public string ExpirationDate { get; set; }

        [JsonIgnore]
        public string ExpirationMonth { get; set; }
        [JsonIgnore]
        public string ExpirationYear { get; set; }

        [JsonProperty("cardCode")]
        public string CardCode { get; set; }
    }
}