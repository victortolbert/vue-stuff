using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Domain {
    public class AuthorizePaymentTransaction {
        public int Id { get; set; }

        public int TransId { get; set; }

        public string ResponseCode { get; set; }

        public string AuthCode { get; set; }

        public string AvsResultCode { get; set; }

        public string CvvResultCode { get; set; }

        public string CavvResultCode { get; set; }

        public int RefTransId { get; set; }

        public string AccountNumber { get; set; }

        public string AccountType { get; set; }

        public string TransHashSha2 { get; set; }

        public string TestRequest { get; set; }

        public int CustomerProfileId { get; set; }

        public string CustomerPaymentProfileId { get; set; }

        public string SupplementalDataQualificationIndicator { get; set; }

        public int NetworkTransId { get; set; }

        public int RefId { get; set; }

        public string AuthorizedAmount { get; set; }

        public string Invoices { get; set; }

        public string Claims { get; set; }

        public int CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
