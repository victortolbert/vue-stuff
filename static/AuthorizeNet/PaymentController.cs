namespace Exemplar.Api.Controllers
{
    public class PaymentController : BaseController
    {
        [HttpGet("GetCustomerProfile")]
        public async Task<IActionResult> GetCustomerProfile(int id)
        {
            var custProfileInfo = new CustomerProfile();
            custProfileInfo.PaymentProfile = new PaymentProfile();
            custProfileInfo.PaymentProfile.BillTo = new Domain.BillTo();
            custProfileInfo.PaymentProfile.Payment = new Domain.Payment();
            custProfileInfo.PaymentProfile.Payment.CreditCard = new Domain.CreditCard();
            var methodParams = string.Format("User Id: {0}", id);
            try
            {
                //Step 1: Get Profile
                var userInfo = await userRepo.GetByIdAsync(id);
                if (userInfo != null)
                {
                    custProfileInfo.FirstName = userInfo.FirstName;
                    custProfileInfo.LastName = userInfo.LastName;
                    custProfileInfo.Email = userInfo.PrimaryEmail;
                    custProfileInfo.PhoneNumber = userInfo.PrimaryPhone;
                    custProfileInfo.Company = "Other Customers"; //Move to config

                    //Step 2: GetPaymentId's
                    var payInfo = await repo.GetPaymentInfo(id);
                    var customerPaymentProfile = mapper.Map<CustomerPaymentProfileDto>(payInfo);
                    if (customerPaymentProfile != null)
                    {
                        custProfileInfo.IsProfileExist = true;

                        //Step 3: GetPaymentInfoFromAuthorize
                        var payProfileResponse = await authorizeNetService.GetCustomerPaymentProfileAsync(new GetCustomerPaymentProfile
                        {
                            GetCustomerPaymentProfileRequest = new GetCustomerPaymentProfileRequest
                            {
                                CustomerProfileId = customerPaymentProfile.CustomerProfileId,
                                CustomerPaymentProfileId = customerPaymentProfile.CustomerPaymentProfileId,
                                IncludeIssuerInfo = "true"
                            }
                        });
                        custProfileInfo.PaymentProfile = new PaymentProfile();
                        custProfileInfo.PaymentProfile = payProfileResponse.PaymentProfile;
                        var expDate = custProfileInfo.PaymentProfile.Payment.CreditCard.ExpirationDate;
                        custProfileInfo.PaymentProfile.Payment.CreditCard.ExpirationMonth = expDate.Substring(1, 2);
                        custProfileInfo.PaymentProfile.Payment.CreditCard.ExpirationYear = expDate;
                        custProfileInfo.PaymentProfile.Payment.CreditCard.CardCode = custProfileInfo.PaymentProfile.Payment.CreditCard.CardCode == null
                            ? "XXX"
                            : custProfileInfo.PaymentProfile.Payment.CreditCard.CardCode;

                        custProfileInfo.PaymentProfile.OriginalAuthAmount = string.Empty;
                    }
                }
            }
            catch (System.Exception ex)
            {
                await LogException(GetType().ToString(), GetCurrentMethod(), methodParams, string.Empty, ex);
                return this.StatusCode(500, ExceptionMessage);
            }

            return Ok(custProfileInfo);
        }

        [HttpGet("GetPaymentInfoByUserId")]
        public async Task<IActionResult> GetPaymentInfoByUserId(int id)
        {
            var methodParams = string.Format("User Id: {0}", id);

            try
            {
                var model = await repo.GetPaymentInfo(id);
                var customerPaymentProfile = mapper.Map<CustomerPaymentProfileDto>(model);
                return Ok(customerPaymentProfile);
            }
            catch (System.Exception ex)
            {
                await LogException(GetType().ToString(), GetCurrentMethod(), methodParams, string.Empty, ex);

                return this.StatusCode(500, ExceptionMessage);
            }
        }
    }
}
