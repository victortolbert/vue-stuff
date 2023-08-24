using System;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Exemplar.Services.AuthorizeNetService.Request;
using Exemplar.Services.AuthorizeNetService.Response;
using Exemplar.Services.Utilities;
using Microsoft.Extensions.Options;

namespace Exemplar.Services.AuthorizeNetService
{

    public class AuthorizeNetService : IAuthorizeNetService
    {
        private readonly HttpClient _httpClient;
        private string _accountName;
        private string _transactionKey;
        private bool _sandbox = true; // Set to false for live mode, true for sandbox testing
        private readonly AuthorizeNetSettings authorizeNetSettings;

        //public AuthorizeNetService(string apiLoginId, string transactionKey)
        public AuthorizeNetService()
        {
            _httpClient = new HttpClient();
        }

        public AuthorizeNetService(IOptions<AuthorizeNetSettings> authorizeNetSettings)
        {
            _httpClient = new HttpClient();
            this.authorizeNetSettings = authorizeNetSettings.Value;
        }


        public async Task<CreateCustomerProfileResponse> CreateCustomerProfileAsync(CreateCustomerProfileAuthorizeRequest request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";


            // Serialize the request object to JSON
            request.createCustomerProfileRequest.MerchantAuthentication = new MerchantAuthentication
            {
                Name = authorizeNetSettings.MerchantName,
                TransactionKey = authorizeNetSettings.TransactionKey
            };

            var jsonRequestData = JsonConvert.SerializeObject(request);
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

            var response = await PostAsync(apiEndpoint, content);
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<CreateCustomerProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to create customer profile. Status code: {response.StatusCode}");
            }
        }

        public async Task<GetCustomerProfileResponse> GetCustomerProfileAsync(GetCustomerProfile request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";

            //Sandbox Credentials
            request.getCustomerProfileRequest.MerchantAuthentication = new MerchantAuthentication
            {
                Name = authorizeNetSettings.MerchantName,
                TransactionKey = authorizeNetSettings.TransactionKey
            };

            // Serialize the request object to JSON
            var jsonRequestData = JsonConvert.SerializeObject(request);

            // Prepare the HTTP request
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
            var response = await PostAsync(apiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<GetCustomerProfileResponse>(jsonResponse);

                var expDate = responseObject.Profile.PaymentProfiles[0].Payment.CreditCard.ExpirationDate;
                if (expDate?.Length > 5)
                {
                    responseObject.Profile.PaymentProfiles[0].Payment.CreditCard.ExpirationMonth = expDate.Substring(expDate.IndexOf("-"), 2);
                    responseObject.Profile.PaymentProfiles[0].Payment.CreditCard.ExpirationMonth = expDate.Substring(1, 4);
                }

                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to get customer profile. Status code: {response.StatusCode}");
            }
        }

        public async Task<UpdateCustomerProfileResponse> UpdateCustomerProfileAsync(UpdateCustomerProfile request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";

            // Serialize the request object to JSON
            var jsonRequestData = JsonConvert.SerializeObject(request);

            // Prepare the HTTP request
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
            var response = await PostAsync(apiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<UpdateCustomerProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to update customer profile. Status code: {response.StatusCode}");
            }
        }

        public async Task<CustomerPaymentProfileResponse> CreateCustomerPaymentProfileAsync(CreateCustomerPaymentProfile request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";


            // Serialize the request object to JSON
            request.CreateCustomerPaymentProfileRequest.MerchantAuthentication = new MerchantAuthentication
            {
                Name = authorizeNetSettings.MerchantName,
                TransactionKey = authorizeNetSettings.TransactionKey
            };

            var jsonRequestData = JsonConvert.SerializeObject(request);
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");

            var response = await PostAsync(apiEndpoint, content);
            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<CustomerPaymentProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to create customer profile. Status code: {response.StatusCode}");
            }
        }

        public async Task<GetCustomerPaymentProfileResponse> GetCustomerPaymentProfileAsync(GetCustomerPaymentProfile request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";

            // Sandbox Credentials
            request.GetCustomerPaymentProfileRequest.MerchantAuthentication = new MerchantAuthentication
            {
                Name = authorizeNetSettings.MerchantName,
                TransactionKey = authorizeNetSettings.TransactionKey
            };

            // Serialize the request object to JSON
            var jsonRequestData = JsonConvert.SerializeObject(request);

            // Prepare the HTTP request
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
            var response = await PostAsync(apiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<GetCustomerPaymentProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to get customer profile. Status code: {response.StatusCode}");
            }
        }

        public async Task<UpdateCustomerPaymentProfileResponse> UpdateCustomerPaymentProfileAsync(UpdateCustomerPaymentProfileAuthorizeRequest request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";

            // Serialize the request object to JSON
            var jsonRequestData = JsonConvert.SerializeObject(request);

            // Prepare the HTTP request
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
            var response = await PostAsync(apiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<UpdateCustomerPaymentProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to update customer profile. Status code: {response.StatusCode}");
            }
        }
        public async Task<UpdateCustomerPaymentProfileResponse> ChargeCustomerPaymentProfileAsync(ChargeCustomerProfileRequest request)
        {
            // API endpoint URL
            var apiEndpoint = _sandbox
                ? "https://apitest.authorize.net/xml/v1/request.api"
                : "https://api.authorize.net/xml/v1/request.api";

            // Serialize the request object to JSON
            var jsonRequestData = JsonConvert.SerializeObject(request);

            // Prepare the HTTP request
            var content = new StringContent(jsonRequestData, Encoding.UTF8, "application/json");
            var response = await PostAsync(apiEndpoint, content);

            if (response.IsSuccessStatusCode)
            {
                var jsonResponse = await response.Content.ReadAsStringAsync();
                var responseObject = JsonConvert.DeserializeObject<UpdateCustomerPaymentProfileResponse>(jsonResponse);
                return responseObject;
            }
            else
            {
                throw new Exception($"Failed to update customer profile. Status code: {response.StatusCode}");
            }
        }

        private async Task<HttpResponseMessage> PostAsync(string apiEndpoint, StringContent content)
        {
            try
            {
                var response = await _httpClient.PostAsync(apiEndpoint, content);
                return response;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
