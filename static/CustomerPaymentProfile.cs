using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Domain
{
    public class CustomerPaymentProfile
    {
        public string CustomerProfileId { get; set; }
        public string CustomerPaymentProfileId { get; set; }
        public int  MerchantCustomerId { get; set; }
        public bool DefaultPaymentProfile { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

    }
    public class CreditCardInfo
    {
        public string CardHolderName { get; set; }
        public string CardNumber { get; set; }
        public string CardExpiration { get; set; }
        public string CardCode { get; set; }
        public string CardType { get; set; }
    }
    public class BillingAddress
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
    }
}
