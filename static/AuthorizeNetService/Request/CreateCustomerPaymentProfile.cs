using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class CreateCustomerPaymentProfile
    {
        [JsonProperty("createCustomerPaymentProfileRequest")]
        public CreateCustomerPaymentProfileRequest CreateCustomerPaymentProfileRequest { get; set; }
    }
}
