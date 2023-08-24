using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class GetCustomerProfileResponse
    {
        public Profile Profile { get; set; }
        public Messages Messages { get; set; }
    }
}
