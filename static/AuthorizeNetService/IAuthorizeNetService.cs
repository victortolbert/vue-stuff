using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Exemplar.Services.AuthorizeNetService.Request;
using Exemplar.Services.AuthorizeNetService.Response;

namespace Exemplar.Services.AuthorizeNetService
{
    public interface IAuthorizeNetService
    {
        public Task<CreateCustomerProfileResponse> CreateCustomerProfileAsync(CreateCustomerProfileAuthorizeRequest request);

        public Task<GetCustomerProfileResponse> GetCustomerProfileAsync(GetCustomerProfile request);

        public Task<UpdateCustomerProfileResponse> UpdateCustomerProfileAsync(UpdateCustomerProfile request);

        public Task<CustomerPaymentProfileResponse> CreateCustomerPaymentProfileAsync(CreateCustomerPaymentProfile request);

        public Task<GetCustomerPaymentProfileResponse> GetCustomerPaymentProfileAsync(GetCustomerPaymentProfile request);

        public Task<UpdateCustomerPaymentProfileResponse> UpdateCustomerPaymentProfileAsync(UpdateCustomerPaymentProfileAuthorizeRequest request);

        public Task<UpdateCustomerPaymentProfileResponse> ChargeCustomerPaymentProfileAsync(ChargeCustomerProfileRequest request);
    }
}
