namespace Exemplar.Dto
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public class CustomerPaymentProfileDto
    {
        public string CustomerProfileId { get; set; }

        public string CustomerPaymentProfileId { get; set; }

        public int MerchantCustomerId { get; set; }

        public bool DefaultPaymentProfile { get; set; }
    }
}
