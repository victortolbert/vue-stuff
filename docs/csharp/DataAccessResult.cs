namespace Exemplar.Services.DataAccessService {
    public class DataAccessResult<T> {
        public T Model { get; set; }
        public bool Result { get; set; }
        public String ResultText { get; set; }
        public String StatusCode { get; set; }

        public DataAccessResult(bool result, T obj, string resultText, string statusCode) {
            Result = result;
            Model = obj;
            ResultText = resultText;
            StatusCode = statusCode.ToUpper();
        }

        public DataAccessResult() { }
    }
}
