using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using Exemplar.Domain;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class UpdateCustomerPaymentProfileRequest
    { 
        [JsonProperty("merchantAuthentication")]
        public MerchantAuthentication MerchantAuthentication { get; set; }
        [JsonProperty("customerProfileId")]
        public string CustomerProfileId { get; set; }
        [JsonProperty("paymentProfile")]
        public UpdatePaymentProfile PaymentProfile { get; set; }
        [JsonProperty("validationMode")]
        public string ValidationMode { get; set; }
    }
}
