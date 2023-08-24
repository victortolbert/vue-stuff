using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class UpdateCustomerPaymentProfile
    {
        [JsonProperty("updateCustomerPaymentProfileRequest")]
        public UpdateCustomerPaymentProfileRequest UpdateCustomerPaymentProfileRequest { get; set; }
    }
}
