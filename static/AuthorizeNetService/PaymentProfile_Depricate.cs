using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService
{
    public class PaymentProfile_Depricate
    {
        public BillTo BillTo { get; set; }
        public Payment Payment { get; set; }
        public bool DefaultPaymentProfile { get; set; }
        public string CustomerProfileId { get; set; }
        public string CustomerPaymentProfileId { get; set; }
        public string OriginalNetworkTransId { get; set; }
        public string OriginalAuthAmount { get; set; }

    }

    public class BillTo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; }
        public string FaxNumber { get; set; }
    }
    public class Payment
    {
        public CreditCard CreditCard { get; set; }
    }

    public class CreditCard
    {
        public string CardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string ExpirationMonth { get; set; }
        public string ExpirationYear { get; set; }
        public string CardCode { get; set; }
        public string CardType { get; set; }
        public string IssuerNumber { get; set; }

    }
}
