using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class GetCustomerProfile
    {
        [JsonProperty("getCustomerProfileRequest")]
        public GetCustomerProfileRequest getCustomerProfileRequest { get; set; }

    }
}
