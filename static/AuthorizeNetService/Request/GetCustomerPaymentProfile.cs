using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class GetCustomerPaymentProfile
    {
        [JsonProperty("getCustomerPaymentProfileRequest")]
        public GetCustomerPaymentProfileRequest GetCustomerPaymentProfileRequest { get; set; }
    }
}
