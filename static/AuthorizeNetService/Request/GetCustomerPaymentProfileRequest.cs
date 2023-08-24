using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class GetCustomerPaymentProfileRequest
    {
        [JsonProperty("merchantAuthentication")]
        public MerchantAuthentication MerchantAuthentication { get; set; }
        [JsonProperty("customerProfileId")]
        public string CustomerProfileId { get; set; }
        [JsonProperty("customerPaymentProfileId")]
        public string CustomerPaymentProfileId { get; set; }
        [JsonProperty("includeIssuerInfo")]
        public string IncludeIssuerInfo { get; set; }
    }
}
