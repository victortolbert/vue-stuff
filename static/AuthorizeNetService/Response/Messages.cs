using System;
using System.Collections.Generic;
using System.Text;

namespace Exemplar.Services.AuthorizeNetService.Response
{
    public class Messages
    {
        public string ResultCode { get; set; }
        public List<Message> Message { get; set; }
    }

    public class Message
    {
        public string Code { get; set; }
        public string Text { get; set; }
    }
}
