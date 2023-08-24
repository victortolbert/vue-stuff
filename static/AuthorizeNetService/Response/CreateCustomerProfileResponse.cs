using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class CreateCustomerProfileResponse
    {
        public string CustomerProfileId { get; set; }
        public List<string> CustomerPaymentProfileIdList { get; set; }
        public List<string> CustomerShippingAddressIdList { get; set; }
        public List<string> ValidationDirectResponseList { get; set; }
        public Messages Messages { get; set; }
    }
}
