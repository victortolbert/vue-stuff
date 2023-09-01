## Payment Form

### Card Data

| Property     | Data Type | Description                                         | Required |
| ------------ | --------- | --------------------------------------------------- | -------- |
| `cardNumber` | String    | Must be a valid 13-16 digit card number.            | Yes      |
| `month`      | String    | 2-digit month.                                      | Yes      |
| `year`       | String    | 2-digit year.                                       | Yes      |
| `cardCode`   | String    | 3 or 4-digit Card Code                              | No       |
| `zip`        | String    | Alphanumeric postal code. 20-character maximum.     | No       |
| `fullName`   | String    | Alphanumeric cardholder name. 64-character maximum. | No       |

### Bank Data

| Property        | Data Type                                                  | Description              |
| --------------- | ---------------------------------------------------------- | ------------------------ |
| `accountNumber` | Numeric string. Up to 17 digits.                           | The bank account number. |
| `routingNumber` | Numeric string. 9 digits.                                  | The bank account number. |
| `nameOnAccount` | String. Up to 22 characters.                               | The bank account number. |
| `accountType`   | String. Either `checking`, `savings` or `businessChecking` | The bank account number. |

### Response Parameters

| Property                  | Type   | Description                                                                                                                                                                                                            |
| ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `opaqueData.dataDescriptor` | String | This value must be passed to the Authorize.net API, along with `dataValue`, to represent the card details.                                                                                                               |
| `opaqueData.dataValue`     | String | This value is the payment nonce that you received from Authorize.net. This value must be passed to the Authorize.net API, along with `dataDescriptor`, to represent the card details. The nonce is valid for 15 minutes. |

## Sample One-Time Payment Request

```json
{
  "createTransactionRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "refId": "123456",
    "transactionRequest": {
      "transactionType": "authCaptureTransaction",
      "amount": "5",
      "payment": {
        "opaqueData": {
          "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
          "dataValue": "1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000"
        }
      }
    }
  }
}
```

### Sample Response

```json
{
  "transactionResponse": {
    "responseCode": "1",
    "authCode": "HW617E",
    "avsResultCode": "Y",
    "cvvResultCode": "",
    "cavvResultCode": "",
    "transId": "2157047189",
    "refTransID": "",
    "transHash": "E7CEB0A9F1BECA32A02493E1B31D5955",
    "testRequest": "0",
    "accountNumber": "XXXX1111",
    "accountType": "Visa",
    "messages": [
      {
        "code": "1",
        "description": "This transaction has been approved."
      }
    ],
    "transHashSha2": "D0C4FFF5648511A5862B917CFD9BB78ABF8A6E1D90C119CBBC4C0B454F4FF40DED15B204E042F36ECA5FB15D02588E4E4A7B85B94E7279599CE6020462CB7DEE",
    "SupplementalDataQualificationIndicator": 0,
    "networkTransId": "123456789NNNH"
  },
  "messages": {
    "resultCode": "Ok",
    "message": [
      {
        "code": "I00001",
        "text": "Successful."
      }
    ]
  }
}
```

## Sample Create Customer Profile Request

You can use `opaqueData` to create customer profiles. Here is a sample
subscription request using our API, with an opaque data object replacing
the usual credit card object.

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
          "opaqueData": {
            "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
            "dataValue": "1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000"
          }
        }
      }
    },
    "validationMode": "testMode"
  }
}
```

### Sample Respsonse

```json
{
  "customerProfileId": "527262",
  "customerPaymentProfileIdList": [
    "86"
  ],
  "customerShippingAddressIdList": [],
  "validationDirectResponseList": [
    "1,1,1,This transaction has been approved.,AJ10K8,Y,10585,none,Test transaction for ValidateCustomerPaymentProfile.,0.00,CC,auth_only,MerchantCustID,Customer FirstName,Customer LastName,,123 Main St.,Bellevue,WA,98004,US,123-123-1235,,customer-profile-email@here.com,,,,,,,,,0.00,0.00,0.00,FALSE,none,675F28BF1C590B17CD2892CD75EC4B67,P,2,,,,,,,,,,,XXXX1111,Visa,,,,,,,0STSMT7WLO5D80U0KJR4Z9A,,,,,,,,,,"
  ],
  "messages": {
    "resultCode": "Ok",
    "message": [
      {
        "code": "I00001",
        "text": "Successful."
      }
    ]
  }
}
```

## Sample Create Customer Payment Profile Request

Use this function to create a new customer payment profile for an existing
customer profile.

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
        "opaqueData": {
          "dataDescriptor": "COMMON.ACCEPT.INAPP.PAYMENT",
          "dataValue": "1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000"
        }
      },
      "defaultPaymentProfile": true
    },
    "validationMode": "liveMode"
  }
}
```

### Sample Response

```json
{
  "customerProfileId": "527262",
  "customerPaymentProfileId": "87",
  "validationDirectResponse": "1,1,1,This transaction has been approved.,AF94HU,Y,10586,none,Test transaction for ValidateCustomerPaymentProfile.,0.00,CC,auth_only,none,John,Doe,,123 Main St.,Bellevue,WA,98004,US,000-000-0000,,email@example.com,,,,,,,,,0.00,0.00,0.00,FALSE,none,76247385B849148C0C6E0C205A6BEFFA,P,2,,,,,,,,,,,XXXX1111,Visa,,,,,,,0TN1VE648DFCJSHQ81GZH9F,,,,,,,,,,",
  "messages": {
    "resultCode": "Ok",
    "message": [{
      "code": "I00001",
      "text": "Successful."
    }
    ]
  }
}
```

## Sample Get Customer Profile Request

Use this function to retrieve an existing customer profile along with
all the associated payment profiles and shipping addresses.

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

### Sample Response

```json
{
  "profile": {
    "paymentProfiles": [
      {
        "customerPaymentProfileId": "87",
        "payment": {
          "creditCard": {
            "cardNumber": "XXXX1111",
            "expirationDate": "XXXX",
            "cardType": "Visa",
            "issuerNumber": "411111"
          }
        },
        "originalNetworkTransId": "0TN1VE648DFCJSHQ81GZH9F",
        "originalAuthAmount": 0,
        "billTo": {
          "phoneNumber": "000-000-0000",
          "firstName": "John",
          "lastName": "Doe",
          "address": "123 Main St.",
          "city": "Bellevue",
          "state": "WA",
          "zip": "98004",
          "country": "US"
        }
      },
      {
        "customerPaymentProfileId": "86",
        "payment": {
          "creditCard": {
            "cardNumber": "XXXX1111",
            "expirationDate": "XXXX",
            "cardType": "Visa",
            "issuerNumber": "411111"
          }
        },
        "originalNetworkTransId": "0STSMT7WLO5D80U0KJR4Z9A",
        "originalAuthAmount": 0,
        "customerType": "individual",
        "billTo": {
          "phoneNumber": "123-123-1235",
          "firstName": "Customer FirstName",
          "lastName": "Customer LastName",
          "address": "123 Main St.",
          "city": "Bellevue",
          "state": "WA",
          "zip": "98004",
          "country": "US"
        }
      }
    ],
    "profileType": "regular",
    "customerProfileId": "527262",
    "merchantCustomerId": "MerchantCustID",
    "description": "Profile description here",
    "email": "customer-profile-email@here.com"
  },
  "messages": {
    "resultCode": "Ok",
    "message": [
      {
        "code": "I00001",
        "text": "Successful."
      }
    ]
  }
}
```

## Sample Get Customer Payment Profile

Use this function to retrieve the details of a customer payment profile
associated with an existing customer profile.

**Important:** If the payment profile has previously been set as the default
payment profile, you can submit this request using `customerProfileId` as
the only parameter. Submitting this request with only the customer
profile ID will cause the information for the default payment profile
to be returned if a default payment profile has been previously
designated. If no payment profile has been designated as the default
payment profile, failing to specify a payment profile will result
in an error.

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

### Response

```json
{
  "paymentProfile": {
    "customerProfileId": "527262",
    "customerPaymentProfileId": "87",
    "payment": {
      "creditCard": {
        "cardNumber": "XXXX1111",
        "expirationDate": "XXXX",
        "cardType": "Visa",
        "issuerNumber": "411111"
      }
    },
    "originalNetworkTransId": "0TN1VE648DFCJSHQ81GZH9F",
    "originalAuthAmount": 0,
    "billTo": {
      "phoneNumber": "000-000-0000",
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St.",
      "city": "Bellevue",
      "state": "WA",
      "zip": "98004",
      "country": "US"
    }
  },
  "messages": {
    "resultCode": "Ok",
    "message": [
      {
        "code": "I00001",
        "text": "Successful."
      }
    ]
  }
}
```

## Sample Charge a Customer Profile

Use this method to authorize and capture a payment using a stored
customer payment profile.

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
        "paymentProfile": { "paymentProfileId": "1000177237" }
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

### Response

```json
{
  "transactionResponse": {
    "responseCode": "1",
    "authCode": "4JYKA2",
    "avsResultCode": "Y",
    "cvvResultCode": "P",
    "cavvResultCode": "2",
    "transId": "2157786076",
    "refTransID": "",
    "transHash": "",
    "testRequest": "0",
    "accountNumber": "XXXX2222",
    "accountType": "Visa",
    "messages": [
      {
        "code": "1",
        "description": "This transaction has been approved."
      }
    ],
    "transHashSha2": "",
    "profile": {
      "customerProfileId": "40338125",
      "customerPaymentProfileId": "1000177237"
    },
    "SupplementalDataQualificationIndicator": 0,
    "networkTransId": "6PUPU4XXWSO7CCQL0YJNYY7"
  },
  "refId": "123456",
  "messages": {
    "resultCode": "Ok",
    "message": [
      {
        "code": "I00001",
        "text": "Successful."
      }
    ]
  }
}
```

## Get Customer Profile Transaction List

Use this method to retrieve transactions for a specific customer profile
or customer payment profile. The function will return data for up to 1000
of the most recent transactions in a single request. Paging options can be
sent to limit the result set or to retrieve additional transactions beyond
the 1000 transaction limit. If no customer payment profile is supplied then
this function will return transactions for all customer payment profiles
associated with the specified customer profile. This allows you to retrieve
all transactions for that customer regardless of card type (such as Visa
or Mastercard) or payment type (such as credit card or bank account).
You can add the sorting and paging options shown below to customize the
result set.

**Important:** The proper response to `getTransactionListForCustomerRequest`
is `getTransactionListResponse`. Failure to observe this behavior may cause
parsing issues.

```json
{
  "getTransactionListForCustomerRequest": {
    "merchantAuthentication": {
      "name": "5KP3u95bQpv",
      "transactionKey": "346HZ32z3fP4hTG2"
    },
    "customerProfileId": "40025205",
    "customerPaymentProfileId": "40027471",
    "sorting": {
      "orderBy": "submitTimeUTC",
      "orderDescending": false
    },
    "paging": {
      "limit": "100",
      "offset": "1"
    }
  }
}
```

### Response

```json
{
  "getTransactionListResponse": {
    "-xmlns": "AnetApi/xml/v1/schema/AnetApiSchema.xsd",
    "messages": {
      "resultCode": "Ok",
      "message": {
        "code": "I00001",
        "text": "Successful."
      }
    },
    "transactions": {
      "transaction": [
        {
          "transId": "12345",
          "submitTimeUTC": "2009-05-30T09:00:00",
          "submitTimeLocal": "2009-05-30T04:00:00",
          "transactionStatus": "settledSuccessfully",
          "invoice": "INV00001",
          "firstName": "John",
          "lastName": "Doe",
          "amount": "2.00",
          "accountType": "Visa",
          "accountNumber": "XXXX1111",
          "settleAmount": "2.00",
          "subscription": {
            "id": "145521",
            "payNum": "1"
          },
          "profile": {
            "customerProfileId": "1806660050",
            "customerPaymentProfileId": "1805324550"
          }
        },
        {
          "transId": "12345",
          "submitTimeUTC": "2009-05-30T09:00:00",
          "submitTimeLocal": "2009-05-30T04:00:00",
          "transactionStatus": "settledSuccessfully",
          "invoice": "INV00001",
          "firstName": "John",
          "lastName": "Doe",
          "amount": "2.00",
          "accountType": "Visa",
          "accountNumber": "XXXX1111",
          "marketType": "eCommerce",
          "product": "Card Not Present",
          "mobileDeviceId": "2354578983274523978"
        }
      ]
    },
    "totalNumInResultSet": "2"
  }
}
```
