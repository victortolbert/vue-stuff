namespace Exemplar.Api.Controllers
{
  public class PaymentApiController : BaseController
  {
    [HttpPost("CreateCustomerProfile")]
    public async Task<IActionResult> CreateCustomerProfile([FromBody] CreateCustomerProfile request)
    {
      try
      {
        var profileRequest = BuildCreateCustomerProfile(request).Result;

        var profileresponse = await authorizeNetService.CreateCustomerProfileAsync(profileRequest);

        var insertProfileId = await repo.InsertAsync(new CustomerPaymentProfile
        {
          CustomerPaymentProfileId = profileresponse.CustomerPaymentProfileIdList[0],
          CustomerProfileId = profileresponse.CustomerProfileId,
          MerchantCustomerId = int.Parse(profileRequest.createCustomerProfileRequest.Profile.MerchantCustomerId),
          DefaultPaymentProfile = true,
          CreatedBy = 72087, // temp remove after system user
          CreatedOn = DateTime.Now
        });

        var response = new CustomerProfileResponse
        {
          IsSuccess = profileresponse?.Messages?.ResultCode == "Ok" ? true : false,
          Messages = profileresponse?.Messages
        };

        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error creating customer profile.", Error = ex.Message });
      }
    }

    [HttpPost("GetCustomerProfile")]
    public async Task<IActionResult> GetCustomerProfile([FromBody] GetCustomerProfile request)
    {
      try
      {
        var response = await authorizeNetService.GetCustomerProfileAsync(request);
        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error getting customer profile.", Error = ex.Message });
      }
    }

    [HttpPost("UpdateCustomerProfile")]
    public async Task<IActionResult> UpdateCustomerProfile([FromBody] UpdateCustomerProfile request)
    {
      try
      {
        var response = await authorizeNetService.UpdateCustomerProfileAsync(request);
        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error updating customer profile.", Error = ex.Message });
      }
    }

    [HttpPost("CreateCustomerPaymentProfile")]
    public async Task<IActionResult> CreateCustomerPaymentProfile(CreateCustomerPaymentProfile request)
    {
      try
      {
        var response = await authorizeNetService.CreateCustomerPaymentProfileAsync(request);
        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error creating customer payment profile.", Error = ex.Message });
      }
    }

    [HttpPost("GetCustomerPaymentProfile")]
    public async Task<IActionResult> GetCustomerPaymentProfile([FromBody] GetCustomerPaymentProfile request)
    {
      try
      {
        var response = await authorizeNetService.GetCustomerPaymentProfileAsync(request);
        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error getting customer payment profile.", Error = ex.Message });
      }
    }

    [HttpPost("UpdateCustomerPaymentProfile")]
    public async Task<IActionResult> UpdateCustomerPaymentProfile([FromBody] CreateCustomerProfile request)
    {
      try
      {
        var profileRequest = BuildUpdateCustomerPaymentProfile(request).Result;
        var profileresponse = await authorizeNetService.UpdateCustomerPaymentProfileAsync(profileRequest);

        var response = new CustomerProfileResponse
        {
          IsSuccess = profileresponse?.Messages?.ResultCode == "Ok" ? true : false,
          Messages = profileresponse?.Messages
        };

        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error updating customer payment profile.", Error = ex.Message });
      }
    }

    [HttpPost("ChargeCustomerProfile")]
    public async Task<IActionResult> ChargeCustomerProfile([FromBody] CustomerProfileRequest request)
    {
      if (request.Id < 1)
      {
        return StatusCode(500, new { Message = "Customer Id is required." });
      }

      var updatePayInfoResponse = new UpdateCustomerPaymentProfileResponse();
      var profileresponse = new UpdateCustomerPaymentProfileResponse();

      try
      {
        if (request.IsPaymentUpdated)
        {
          var updateRequest = BuildUpdateCustomerPaymentProfile(request).Result;
          updatePayInfoResponse = await authorizeNetService.UpdateCustomerPaymentProfileAsync(updateRequest);
        }

        if (updatePayInfoResponse.ResultCode != null)
        {
          var profileRequest = BuildChargeCustomerProfile(request).Result;
          profileresponse = await authorizeNetService.ChargeCustomerPaymentProfileAsync(profileRequest);
        }

        var response = new CustomerProfileResponse
        {
          IsSuccess = profileresponse?.Messages?.ResultCode == "Ok" ? true : false,
          Messages = profileresponse?.Messages
        };

        return Ok(response);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { Message = "Error updating customer payment profile.", Error = ex.Message });
      }
    }

    private async Task<CreateCustomerProfileAuthorizeRequest> BuildCreateCustomerProfile(CreateCustomerProfile customerProfile)
    {
        CreateCustomerProfileAuthorizeRequest createCustomerProfileRequest = null;

        //Get Customer Merchant Customer Id
        var merchantId = customerProfile.Id;
        if (merchantId < 1)
        {
            var userInfo = await userRepo.GetByPrimaryEmailAsync(customerProfile.Email);
            if (userInfo != null)
                merchantId = userInfo.Id;
        }

        if (merchantId > 0)
        {
            createCustomerProfileRequest = new CreateCustomerProfileAuthorizeRequest
            {
                createCustomerProfileRequest = new CreateCustomerProfileRequest
                {
                    MerchantAuthentication = new MerchantAuthentication
                    {
                        Name = authorizeNetSettings.MerchantName,
                        TransactionKey = authorizeNetSettings.TransactionKey
                    },
                    Profile = new Services.AuthorizeNetService.Request.Profile
                    {
                        Description = customerProfile.FirstName + " " + customerProfile.LastName + " " + "Payment Profile",
                        MerchantCustomerId = merchantId.ToString(),
                        Email = customerProfile.Email,
                        PaymentProfiles = new Services.AuthorizeNetService.Request.PaymentProfile
                        {
                            CustomerType = "individual",
                            DefaultPaymentProfile = true,
                            BillTo = new Services.AuthorizeNetService.Request.BillTo
                            {
                                FirstName = customerProfile.FirstName,
                                LastName = customerProfile.LastName,
                                Address = customerProfile.PaymentProfile.BillTo.Address,
                                City = customerProfile.PaymentProfile.BillTo.City,
                                State = customerProfile.PaymentProfile.BillTo.State,
                                Company = customerProfile.PaymentProfile.BillTo.Company,
                                Zip = customerProfile.PaymentProfile.BillTo.Zip,
                                PhoneNumber = customerProfile.PaymentProfile.BillTo.PhoneNumber,
                                Country = "US",
                            },
                            Payment = new Services.AuthorizeNetService.Request.Payment
                            {
                                CreditCard = new Services.AuthorizeNetService.Request.CreditCard
                                {
                                    CardNumber = customerProfile.PaymentProfile.Payment.CreditCard.CardNumber,
                                    ExpirationDate = customerProfile.PaymentProfile.Payment.CreditCard.ExpirationYear + "-" + customerProfile.PaymentProfile.Payment.CreditCard.ExpirationMonth,
                                    CardCode = customerProfile.PaymentProfile.Payment.CreditCard.CardCode
                                }
                            }
                        }
                    },
                    ValidationMode = authorizeNetSettings.ValidationMode
                }
            };
        }

        return createCustomerProfileRequest;
    }

    private async Task<UpdateCustomerPaymentProfileAuthorizeRequest> BuildUpdateCustomerPaymentProfile(CreateCustomerProfile customerProfile)
    {
        UpdateCustomerPaymentProfileAuthorizeRequest updateCustomerPaymentProfileAuthorizeRequest = null;

        //Get Customer Merchant Customer Id
        var payInfo = await repo.GetPaymentInfo(customerProfile.Id);
        var customerPaymentProfile = mapper.Map<CustomerPaymentProfileDto>(payInfo);
        if (customerPaymentProfile != null)
        {
            updateCustomerPaymentProfileAuthorizeRequest = new UpdateCustomerPaymentProfileAuthorizeRequest
            {
                updateCustomerPaymentProfileRequest = new UpdateCustomerPaymentProfileRequest
                {
                    MerchantAuthentication = new MerchantAuthentication
                    {
                        Name = authorizeNetSettings.MerchantName,
                        TransactionKey = authorizeNetSettings.TransactionKey
                    },
                    CustomerProfileId = customerPaymentProfile.CustomerProfileId,
                    PaymentProfile = new UpdatePaymentProfile
                    {
                        BillTo = new Services.AuthorizeNetService.Request.BillTo
                        {
                            FirstName = customerProfile.FirstName,
                            LastName = customerProfile.LastName,
                            Address = customerProfile.PaymentProfile.BillTo.Address,
                            City = customerProfile.PaymentProfile.BillTo.City,
                            State = customerProfile.PaymentProfile.BillTo.State,
                            Company = customerProfile.PaymentProfile.BillTo.Company,
                            Zip = customerProfile.PaymentProfile.BillTo.Zip,
                            PhoneNumber = customerProfile.PaymentProfile.BillTo.PhoneNumber,
                            Country = "US",
                        },
                        Payment = new Services.AuthorizeNetService.Request.Payment
                        {
                            CreditCard = new Services.AuthorizeNetService.Request.CreditCard
                            {
                                CardNumber = customerProfile.PaymentProfile.Payment.CreditCard.CardNumber,
                                ExpirationDate = customerProfile.PaymentProfile.Payment.CreditCard.ExpirationYear + "-" + customerProfile.PaymentProfile.Payment.CreditCard.ExpirationMonth,
                                CardCode = customerProfile.PaymentProfile.Payment.CreditCard.CardCode
                            }
                        },
                        CustomerPaymentProfileId = customerPaymentProfile.CustomerPaymentProfileId,
                        CustomerType = "individual",
                        DefaultPaymentProfile = true
                    },
                    ValidationMode = authorizeNetSettings.ValidationMode
                }
            };
        }

        return updateCustomerPaymentProfileAuthorizeRequest;
    }

    private async Task<UpdateCustomerPaymentProfileAuthorizeRequest> BuildUpdateCustomerPaymentProfile(CustomerProfileRequest customerProfile)
    {
        UpdateCustomerPaymentProfileAuthorizeRequest updateCustomerPaymentProfileAuthorizeRequest = null;

        //Get Customer Merchant Customer Id
        var payInfo = await repo.GetPaymentInfo(customerProfile.Id);
        var customerPaymentProfile = mapper.Map<CustomerPaymentProfileDto>(payInfo);
        if (customerPaymentProfile != null)
        {
            updateCustomerPaymentProfileAuthorizeRequest = new UpdateCustomerPaymentProfileAuthorizeRequest
            {
                updateCustomerPaymentProfileRequest = new UpdateCustomerPaymentProfileRequest
                {
                    MerchantAuthentication = new MerchantAuthentication
                    {
                        Name = authorizeNetSettings.MerchantName,
                        TransactionKey = authorizeNetSettings.TransactionKey
                    },
                    CustomerProfileId = customerPaymentProfile.CustomerProfileId,
                    PaymentProfile = new UpdatePaymentProfile
                    {
                        BillTo = new Services.AuthorizeNetService.Request.BillTo
                        {
                            FirstName = customerProfile.FirstName,
                            LastName = customerProfile.LastName,
                            Address = customerProfile.PaymentProfile.BillTo.Address,
                            City = customerProfile.PaymentProfile.BillTo.City,
                            State = customerProfile.PaymentProfile.BillTo.State,
                            Company = customerProfile.PaymentProfile.BillTo.Company,
                            Zip = customerProfile.PaymentProfile.BillTo.Zip,
                            PhoneNumber = customerProfile.PaymentProfile.BillTo.PhoneNumber,
                            Country = "US",
                        },
                        Payment = new Services.AuthorizeNetService.Request.Payment
                        {
                            CreditCard = new Services.AuthorizeNetService.Request.CreditCard
                            {
                                CardNumber = customerProfile.PaymentProfile.Payment.CreditCard.CardNumber,
                                ExpirationDate = customerProfile.PaymentProfile.Payment.CreditCard.ExpirationYear + "-" + customerProfile.PaymentProfile.Payment.CreditCard.ExpirationMonth,
                                CardCode = customerProfile.PaymentProfile.Payment.CreditCard.CardCode == "XXX"
                                    ? "123"
                                    : customerProfile.PaymentProfile.Payment.CreditCard.CardCode
                            }
                        },
                        CustomerPaymentProfileId = customerPaymentProfile.CustomerPaymentProfileId,
                        CustomerType = "individual",
                        DefaultPaymentProfile = true
                    },
                    ValidationMode = authorizeNetSettings.ValidationMode
                }
            };
        }

        return updateCustomerPaymentProfileAuthorizeRequest;
    }

    private async Task<ChargeCustomerProfileRequest> BuildChargeCustomerProfile(CustomerProfileRequest request)
    {
        ChargeCustomerProfileRequest chargeCustomerProfileRequest = null;

        // Get Customer Merchant Customer Id
        // Check if profile exist
        var payInfo = await repo.GetPaymentInfo(request.Id);

        if (payInfo == null)
        {
            // Create Profile with payment info
            var createProfileRequest = new CreateCustomerProfile();

            createProfileRequest.FirstName = request.FirstName;
            createProfileRequest.LastName = request.LastName;
            createProfileRequest.PhoneNumber = request.PhoneNumber;
            createProfileRequest.Company = request.Company;
            createProfileRequest.Id = request.Id;
            createProfileRequest.Email = request.Email;

            createProfileRequest.PaymentProfile = new Services.AuthorizeNetService.Request.PaymentProfile()
            {
                BillTo = new Services.AuthorizeNetService.Request.BillTo
                {
                    FirstName = request.PaymentProfile.BillTo.FirstName,
                    LastName = request.PaymentProfile.BillTo.LastName,
                    Company = request.PaymentProfile.BillTo.Company,
                    Address = request.PaymentProfile.BillTo.Address,
                    City = request.PaymentProfile.BillTo.City,
                    State = request.PaymentProfile.BillTo.State,
                    Zip = request.PaymentProfile.BillTo.Zip,
                    PhoneNumber = request.PaymentProfile.BillTo.PhoneNumber
                },
                Payment = new Services.AuthorizeNetService.Request.Payment
                {
                    CreditCard = new Services.AuthorizeNetService.Request.CreditCard
                    {
                        CardNumber = request.PaymentProfile.Payment.CreditCard.CardNumber,
                        ExpirationDate = request.PaymentProfile.Payment.CreditCard.ExpirationYear + "-" + request.PaymentProfile.Payment.CreditCard.ExpirationMonth,
                        CardCode = request.PaymentProfile.Payment.CreditCard.CardCode,
                    }
                }
            };

            var createprofileRequest = BuildCreateCustomerProfile(createProfileRequest).Result;

            var createProfileresponse = await authorizeNetService.CreateCustomerProfileAsync(createprofileRequest);

            var insertProfileId = await repo.InsertAsync(new CustomerPaymentProfile
            {
                CustomerPaymentProfileId = createProfileresponse.CustomerPaymentProfileIdList[0],
                CustomerProfileId = createProfileresponse.CustomerProfileId,
                MerchantCustomerId = int.Parse(createprofileRequest.createCustomerProfileRequest.Profile.MerchantCustomerId),
                DefaultPaymentProfile = true,
                CreatedBy = 72087, // temp remove after system user
                CreatedOn = DateTime.Now
            });
        }

        payInfo = await repo.GetPaymentInfo(request.Id);
        var customerPaymentProfile = mapper.Map<CustomerPaymentProfileDto>(payInfo);

        if (customerPaymentProfile != null)
        {
            chargeCustomerProfileRequest = new ChargeCustomerProfileRequest
            {
                createTransactionRequest = new CreateTransactionRequest
                {
                    MerchantAuthentication = new MerchantAuthentication
                    {
                        Name = authorizeNetSettings.MerchantName,
                        TransactionKey = authorizeNetSettings.TransactionKey
                    },
                    RefId = "123456",
                    TransactionRequest = new TransactionRequest
                    {
                        TransactionType = "authCaptureTransaction",
                        Amount = request.PaymentProfile.OriginalAuthAmount,
                        Profile = new ChargeCustomerProfile
                        {
                            CustomerProfileId = customerPaymentProfile.CustomerProfileId,
                            PaymentProfile = new ChargePaymentProfile
                            {
                                PaymentProfileId = customerPaymentProfile.CustomerPaymentProfileId
                            }
                        },
                        LineItems = new LineItems
                        {
                            LineItem = new LineItem
                            {
                                ItemId = "1",
                                Name = "10001",
                                Description = "Invoice Payment",
                                Quantity = "1",
                                UnitPrice = request.PaymentProfile.OriginalAuthAmount
                            }
                        },
                        ProcessingOptions = new ProcessingOptions
                        {
                            IsSubsequentAuth = "true"
                        },
                        AuthorizationIndicatorType = new AuthorizationIndicatorType
                        {
                            AuthorizationIndicator = "final"
                        }
                    }
                }
            };
        }

        return chargeCustomerProfileRequest;
    }
  }
}
