using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class UpdateCustomerPaymentProfileResponse : Messages
    {
        public string ValidationDirectResponse { get; set; }
        public Messages Messages { get; set; }
    }
}
