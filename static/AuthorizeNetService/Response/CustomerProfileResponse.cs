using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class CustomerProfileResponse
    {
        public bool IsSuccess { get; set; }
        public Messages Messages { get; set; }
    }
}
