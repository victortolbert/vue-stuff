using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Domain {
    public class AuthorizePaymentProfile {
        public int Id { get; set; }

        public string CustomerProfileId { get; set; }

        public string CustomerPaymentProfileId { get; set; }

        public int MerchantCustomerId { get; set; }

        public bool DefaultPaymentProfile { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
    }

}
