namespace Exemplar.Services.DataAccessService {
    public interface IDataAccessService {
        Task<DataAccessResult<T>> Patch<T>(string route, T modelIn);
        Task<DataAccessResult<O>> Patch<T, O>(string route, T modelIn);
        Task<DataAccessResult<T>> Post<T>(string route, T modelIn);
        Task<DataAccessResult<O>> Post<T,O>(string route, T modelIn);
        Task<DataAccessResult<T>> Get<T>(string route);
        Task<DataAccessResult<T>> Delete<T>(string route);
        Task<DataAccessResult<O>> Put<T, O>(string route, T modelIn);
    }
}
