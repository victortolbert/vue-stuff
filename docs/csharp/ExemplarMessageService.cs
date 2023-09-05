using Exemplar.Dto;
using Exemplar.Dto.Enums;
using Exemplar.Services.DataAccessService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Exemplar.Services.ExemplarMessageService {
    public class ExemplarMessageService : IExemplarMessageService {
        private readonly IDataAccessService dataAccessService;
        private readonly string exemplarMessageRoute = "ExemplarMessages";

        public ExemplarMessageService(IDataAccessService dataAccessService) {
            this.dataAccessService = dataAccessService;
        }

        public string GetCurrentMethod([System.Runtime.CompilerServices.CallerMemberName] string method = "") {
            return method;
        }

        public async Task InsertExceptionMessageAsync(
          string className,
          string methodName,
          string parameters,
          string operation,
          System.Exception ex
        ) {
            await Insert(className, methodName, parameters, operation, (int)ExemplarMessageTypeEnum.Exception, ex.StackTrace, GetExceptionMessages(ex));
        }

        public async Task InsertExceptionMessageAsync(
            string className,
            string methodName,
            string parameters,
            string operation,
            string exceptionMessage
        ) {
            await Insert(className, methodName, parameters, operation, (int)ExemplarMessageTypeEnum.Exception, string.Empty, exceptionMessage);
        }

        public async Task InsertTraceMessageAsync(
          string className,
          string methodName,
          string parameters,
          string operation,
          string message
        ) {
            await Insert(className, methodName, parameters, operation, (int)ExemplarMessageTypeEnum.Trace, string.Empty , message);
        }

        private async Task Insert(
          string className,
          string methodName,
          string parameters,
          string operation,
          int exemplarMessageTypeId,
          string stackTrace,
          string exceptionMessage
        ) {
            var message = new ExemplarMessageDto {
                VsProject = className.Substring(0, className.IndexOf(".", className.IndexOf(".") + 1)),
                ClassName = className.Contains(".")
                  ? className.Substring(className.LastIndexOf(".") + 1)
                  : className,
                MethodName = methodName,
                Message = exceptionMessage,
                ExemplarMessageTypeId = exemplarMessageTypeId,
                Parameters = parameters,
                Operation = operation,
                StackTrace = stackTrace,
                CreatedOn = System.DateTime.Now
            };

            try {
                await dataAccessService.Post<ExemplarMessageDto>(exemplarMessageRoute, message);
            }

            catch (System.Exception) {
            }
        }

        private static string GetExceptionMessages(System.Exception e) {
            var messages = new List<string>();

            do {
                messages.Add(e.Message);
                e = e.InnerException;
            }

            while (e != null);

            return string.Join(" - ", messages);
        }
    }
}
