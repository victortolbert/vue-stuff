using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class MerchantAuthentication
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("transactionKey")]
        public string TransactionKey { get; set; }
    }
}
