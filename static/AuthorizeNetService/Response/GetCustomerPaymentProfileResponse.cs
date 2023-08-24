using System;
using System.Collections.Generic;
using System.Text;
using Exemplar.Domain;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class GetCustomerPaymentProfileResponse
    {
        public PaymentProfile PaymentProfile { get; set; }

        public Messages Messages { get; set; }
    }
}
