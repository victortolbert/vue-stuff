using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class CustomerPaymentProfileRequest
    {
        public string CustomerProfileId { get; set; }
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
    }
}
