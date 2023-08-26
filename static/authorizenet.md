## Customer Profiles

### Get Customer Profile

Use this function to retrieve an existing customer profile along with all the associated payment profiles and shipping addresses.

```json
{
  "getCustomerProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "customerProfileId": "10000",
    "includeIssuerInfo": "true"
  }
}
```

### Create Customer Profile

Use this function to create a new customer profile including any customer payment profiles and customer shipping addresses.

```json
{
  "createCustomerProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "profile": {
      "merchantCustomerId": "Merchant_Customer_ID",
      "description": "Profile description here",
      "email": "customer-profile-email@here.com",
      "paymentProfiles": {
        "customerType": "individual",
        "payment": {
          "creditCard": {
            "cardNumber": "4111111111111111",
            "expirationDate": "2025-12"
          }
        }
      }
    },
    "validationMode": "testMode"
  }
}
```

### Update Customer Profile

Use this function to update an existing customer profile.

```json
{
  "updateCustomerProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "profile": {
      "merchantCustomerId": "custId123",
      "description": "some description",
      "email": "newaddress@example.com",
      "customerProfileId": "10000"
    }
  }
}
```

### Get Customer Payment Profile

Use this function to retrieve the details of a customer payment profile
associated with an existing customer profile.

Important: If the payment profile has previously been set as the default payment
profile, you can submit this request using `customerProfileId` as the only
parameter. Submitting this request with only the customer profile ID will cause
the information for the default payment profile to be returned if a default
payment profile has been previously designated. If no payment profile has been
designated as the default payment profile, failing to specify a payment profile
will result in an error.

```json
{
  "getCustomerPaymentProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "customerProfileId": "10000",
    "customerPaymentProfileId": "20000",
    "includeIssuerInfo": "true"
  }
}
```

### Create Customer Payment Profile

Use this function to create a new customer payment profile for an existing customer profile.

```json
{
  "createCustomerPaymentProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "customerProfileId": "10000",
    "paymentProfile": {
      "billTo": {
        "firstName": "John",
        "lastName": "Doe",
        "address": "123 Main St.",
        "city": "Bellevue",
        "state": "WA",
        "zip": "98004",
        "country": "US",
        "phoneNumber": "000-000-0000"
      },
      "payment": {
        "creditCard": {
          "cardNumber": "4111111111111111",
          "expirationDate": "2023-12"
        }
      },
      "defaultPaymentProfile": false
    },
    "validationMode": "liveMode"
  }
}
```

### Update Customer Payment Profile

Use this function to update a payment profile for an existing customer profile.

Important: If some fields in this request are not submitted or are submitted
with a blank value, the values in the original profile are removed. As a best
practice to prevent this from happening, call `getCustomerPaymentProfileRequest`
to receive all current information including masked payment information. Change
the field or fields that you wish to update, and then reuse all the fields you
received, with updates, in a call to `updateCustomerPaymentProfileRequest`.

To test the validity of new payment information, call
`validateCustomerPaymentProfileRequest` after successfully updating the payment
profile.

```json
{
  "updateCustomerPaymentProfileRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "customerProfileId": "10000",
    "paymentProfile": {
      "billTo": {
        "firstName": "John",
        "lastName": "Doe",
        "company": "",
        "address": "123 Main St.",
        "city": "Bellevue",
        "state": "WA",
        "zip": "98004",
        "country": "US",
        "phoneNumber": "000-000-0000",
        "faxNumber": ""
      },
      "payment": {
        "creditCard": {
          "cardNumber": "4111111111111111",
          "expirationDate": "2026-01"
        }
      },
      "defaultPaymentProfile": false,
      "customerPaymentProfileId": "20000"
    },
    "validationMode": "liveMode"
  }
}
```

### Validate Customer Payment Profile

Use this function to generate a test transaction that verifies an existing customer payment profile. No customer receipt emails are sent when the `validateCustomerPaymentProfileRequest` function is called.

## Payment Transactions

### Charge a Customer Profile

Use this method to authorize and capture a payment using a stored customer
payment profile.

Important: You can use Customer Profiles with `createTransactionRequest` calls
by using the profile field and its children as payment information.

```json
{
  "createTransactionRequest": {
    "merchantAuthentication": {
      "name": "9bSaKC66uHg",
      "transactionKey": "8xszx7B7674QxHqe"
    },
    "refId": "123456",
    "transactionRequest": {
      "transactionType": "authCaptureTransaction",
      "amount": "45",
      "profile": {
        "customerProfileId": "40338125",
        "paymentProfile": {
          "paymentProfileId": "1000177237"
        }
      },
      "lineItems": {
        "lineItem": {
          "itemId": "1",
          "name": "vase",
          "description": "Cannes logo",
          "quantity": "18",
          "unitPrice": "45.00"
        }
      },
      "processingOptions": {
        "isSubsequentAuth": "true"
      },
      "subsequentAuthInformation": {
        "originalNetworkTransId": "123456789123456",
        "originalAuthAmount": "45.00",
        "reason": "resubmission"
      },
      "authorizationIndicatorType": {
        "authorizationIndicator": "final"
      }
    }
  }
}
```

Create Customer Profile
Get Customer Profile
Update Customer Profile

Create Customer Payment Profile
Get Customer Payment Profile
Update Customer Payment Profile

Charge Customer Profile

GetCustomerProfile
GetPaymentInfoByUserId

Accept.js is a JavaScript-based solution for sending secure payment data
directly to Authorize.net. The Accept JavaScript library intercepts the payment
data before it is passed to your server and instead submits it directly to
Authorize.net, which replaces it with a one-time-use token, or payment nonce.
This payment nonce, which is returned by the JavaScript library, can be used in
the place of payment data in any Authorize.net API request.

- CustomerPaymentProfileController
  - Get
  - Create
  - Update
- CustomerProfileController
  - Get
  - Create
  - Update
- PaymentTransactionController
  - ChargeCreditCard
  - ChargeCustomerProfile

```ts
const endpoints = [
  {
    name: 'Get Customer Profile',
    description: 'Use this function to retrieve an _existing_ customer profile along with all the associated payment profiles and shipping addresses.'
  },
  {
    name: 'Get Payment Profile',
    description: 'Use this function to retrieve the details of a payment profile associated with an _existing_ customer profile.'
  },
  {
    name: 'Create Customer Profile',
    description: 'Use this function to create a new customer profile including any payment profiles and shipping addresses.'
  },
  {
    name: 'Create Payment Profile',
    description: 'Use this function to create a new payment profile for an _existing_ customer profile.'
  },
  {
    name: 'Update Customer Profile',
    description: 'Use this function to update an existing customer profile.'
  },
  {
    name: 'Update Payment Profile',
    description: 'Use this function to update a payment profile for an existing customer profile.'
  },
  {
    name: 'Validate Customer Payment Profile',
    description: 'Use this function to generate a test transaction that verifies an existing customer payment profile. No customer receipt emails are sent when the validateCustomerPaymentProfileRequest function is called.'
  },
  {
    name: 'Charge a Customer Profile',
    description: 'Use this method to authorize and capture a payment using a stored payment profile.'
  },
  {
    name: 'Charge a Credit Card',
    description: 'Use this method to authorize and capture a credit card payment.'
  },
  {
    name: 'Create an Accept Payment Transaction',
    description: 'Use this function to create an Authorize.net payment transaction request, using the Accept Payment nonce in place of card data.'
  },
  {
    name: 'Get Accept Customer Profile Page',
    description: 'Use this function to initiate a request for direct access to the Authorize.net website.'
  },
  {
    name: 'Get an Accept Payment Page',
    description: 'Use this function to retrieve a form token which can be used to request the Authorize.net Accept hosted payment page.'
  }
]
```

```ts
await fetch(url, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
```
