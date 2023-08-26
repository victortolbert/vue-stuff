using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class UpdateCustomerProfileRequest
    {
        [JsonProperty("merchantAuthentication")]
        public MerchantAuthentication MerchantAuthentication { get; set; }

        [JsonProperty("profile")]
        public UpdateProfile Profile { get; set; }
    }

    public class UpdateProfile
    {
        [JsonProperty("merchantCustomerId")]
        public string MerchantCustomerId { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("customerProfileId")]
        public string CustomerProfileId { get; set; }
    }
}
