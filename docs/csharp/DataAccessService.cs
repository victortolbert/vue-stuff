namespace Exemplar.Services.DataAccessService {
    public class DataAccessService : IDataAccessService {
        private HttpClient apiClient { get; set; }
        private HttpContext httpContext;

        public DataAccessService(HttpClient apiClient) {
            this.apiClient = apiClient;
        }

        public async Task<DataAccessResult<T>> Get<T>(string route) {
            //string sessionString = httpContext.Session.GetString("HelloWorld");

            var request = new HttpRequestMessage(HttpMethod.Get, route);

            var response = await apiClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);˚

            if (response.IsSuccessStatusCode) {
                string content = await response.Content.ReadAsStringAsync();

                try {
                    return new DataAccessResult<T>(true, JsonConvert.DeserializeObject<T>(content), string.Empty, response.ReasonPhrase);
                }

                catch (Exception ex) {
                    return null;
                }
            } else {
                var actionResult = response.ReasonPhrase;

                if (actionResult == "Not Found") {
                    return new DataAccessResult<T>(false, default, "Not Found", response.ReasonPhrase);
                } else {
                    return new DataAccessResult<T>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);
                }
            }
        }

        public async Task<DataAccessResult<T>> Patch<T>(string route, T modelIn) {
            return await Patch<T, T>(route, modelIn);
        }

        public async Task<DataAccessResult<O>> Patch<T, O>(string route, T modelIn) {
            var response = await SendRequest(route, modelIn, HttpMethod.Patch);

            if (response.IsSuccessStatusCode) {
                string content = await response.Content.ReadAsStringAsync();
                return new DataAccessResult<O>(true, JsonConvert.DeserializeObject<O>(content), string.Empty, response.ReasonPhrase);
            }

            return new DataAccessResult<O>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);
        }

        public async Task<DataAccessResult<T>> Post<T>(string route, T modelIn) {
            var jsonDto = JsonConvert.SerializeObject(modelIn);

            var request = new HttpRequestMessage(HttpMethod.Post, route);

            request.Content = new StringContent(jsonDto, System.Text.Encoding.Unicode, "application/json");

            var response = await apiClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);

            if (response.IsSuccessStatusCode) {
                string content = await response.Content.ReadAsStringAsync();
                return new DataAccessResult<T>(true, JsonConvert.DeserializeObject<T>(content), string.Empty, response.ReasonPhrase);
            }
            else {
                return new DataAccessResult<T>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);

                // TODO: Figure this out throw new DataAccessException(new Exception(response.Content.ReadAsStringAsync().Result));
            }
        }

        public async Task<DataAccessResult<O>> Post<T, O>(string route, T modelIn) {
            var response = await SendRequest(route, modelIn);

            if (response.IsSuccessStatusCode) {
                string content = await response.Content.ReadAsStringAsync();
                return new DataAccessResult<O>(true, JsonConvert.DeserializeObject<O>(content), string.Empty, response.ReasonPhrase);
            } else {
                return new DataAccessResult<O>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);

                // TODO: Figure this out throw new DataAccessException(new Exception(response.Content.ReadAsStringAsync().Result));
            }
        }

        private async Task<HttpResponseMessage> SendRequest<T>(string route, T modelIn, HttpMethod method = null) {
            method ??= HttpMethod.Post;

            var jsonDto = JsonConvert.SerializeObject(modelIn);

            var request = new HttpRequestMessage(method, route);

            request.Content = new StringContent(jsonDto, System.Text.Encoding.Unicode, "application/json");

            return await apiClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);
        }

        public async Task<DataAccessResult<O>> Put<T, O>(string route, T modelIn) {
            var jsonDto = JsonConvert.SerializeObject(modelIn);

            var request = new HttpRequestMessage(HttpMethod.Put, route);

            request.Content = new StringContent(jsonDto, System.Text.Encoding.Unicode, "application/json");

            var response = await apiClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);

            if (response.IsSuccessStatusCode) {
                return new DataAccessResult<O>(true, default, string.Empty, response.ReasonPhrase);
            } else {
                // TODO CHECK 404 RESPONSE CODE AND HANDLE
                return new DataAccessResult<O>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);
            }
        }

        // public async Task<DataAccessResult<T>> Patch<T>(string route, T modelIn) {
        //    var jsonDto = JsonConvert.SerializeObject(modelIn);

        //    HttpResponseMessage response = await client.PatchAsync(route, new StringContent(jsonDto, System.Text.Encoding.Unicode, "application/json"));

        //    if (response.IsSuccessStatusCode) {
        //        string content = await response.Content.ReadAsStringAsync();
        //        return new DataAccessResult<T>(true, JsonConvert.DeserializeObject<T>(content), string.Empty);
        //    } else {
        //        return new DataAccessResult<T>(false, default(T), response.Content.ReadAsStringAsync().Result);
        //    }
        //}

        public async Task<DataAccessResult<T>> Delete<T>(string route) {
            var request = new HttpRequestMessage(HttpMethod.Delete, route);

            var response = await apiClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);

            if (response.IsSuccessStatusCode) {
                return new DataAccessResult<T>(true, default, string.Empty, response.ReasonPhrase);
            } else {
                return new DataAccessResult<T>(false, default, response.Content.ReadAsStringAsync().Result, response.ReasonPhrase);
            }
        }
    }
}
