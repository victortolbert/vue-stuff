using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class UpdateCustomerProfile
    {
        [JsonProperty("updateCustomerProfileRequest")]
        public UpdateCustomerProfileRequest UpdateCustomerProfileRequest { get; set; }

    }
}
