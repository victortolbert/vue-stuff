using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class CustomerProfileRequest
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Company { get; set; }

        public string Invoices { get; set; }
        public string Claims { get; set; }

        public PayProfile PaymentProfile { get; set; }
        public bool IsProfileExist { get; set; }
        public bool IsPaymentUpdated { get; set; }

    }
    public class PayProfile
    {
        public CustomerBillTo BillTo { get; set; }
        public CustomerPayment Payment { get; set; }
        public bool DefaultPaymentProfile { get; set; }
        public string CustomerProfileId { get; set; }
        public string CustomerPaymentProfileId { get; set; }
        public string OriginalNetworkTransId { get; set; }
        public string OriginalAuthAmount { get; set; }

    }
    public class CustomerBillTo
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
    public class CustomerPayment
    {
        public CustomerCreditCard CreditCard { get; set; }
    }

    public class CustomerCreditCard
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
