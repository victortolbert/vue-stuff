namespace Exemplar.Services.ExemplarMessageService {
    public interface IExemplarMessageService {
        Task InsertExceptionMessageAsync(string className, string methodName, string parameters, string operation, System.Exception ex);
        Task InsertExceptionMessageAsync(string className, string methodName, string parameters, string operation, string exceptionMessage);
        Task InsertTraceMessageAsync(string className, string methodName, string parameters, string operation, string message);
        string GetCurrentMethod([System.Runtime.CompilerServices.CallerMemberName] string method = "");
    }
}
