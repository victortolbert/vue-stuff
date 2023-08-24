using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService
{
    public class Profile
    {
        public List<PaymentProfile_Depricate> PaymentProfiles { get; set; }
        public string ProfileType { get; set; }
        public string CustomerProfileId { get; set; }
        public string MerchantCustomerId { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
    }
}
