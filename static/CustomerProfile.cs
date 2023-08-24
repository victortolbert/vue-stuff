using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Domain
{
    public class CustomerProfile
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Company { get; set; }
        public PaymentProfile PaymentProfile { get; set; }

        public bool IsProfileExist { get; set; }
    }
}
