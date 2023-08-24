using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class CustomerPaymentProfileResponse
    {
        [JsonProperty("customerProfileId")]
        public string CustomerProfileId { get; set; }
        [JsonProperty("customerPaymentProfileId")]
        public string CustomerPaymentProfileId { get; set; }
        [JsonProperty("validationDirectResponse")]
        public string ValidationDirectResponse { get; set; }
        [JsonProperty("messages")]
        public Messages Messages { get; set; }
    }
}
