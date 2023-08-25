using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Domain {
    public class AuthorizePaymentTransMessage {
        public int Id { get; set; }

        public string TransId { get; set; }

        public string Code { get; set; }

        public int Description { get; set; }
    }
}
