import type { MerchantAuthentication } from '.'

export interface HostedPaymentPageGetRequest {
  merchantAuthentication: MerchantAuthentication
  transactionRequest: TransactionRequest
  hostedPaymentSettings: HostedPaymentSettings
}

interface TransactionRequest {
  transactionType: string
  amount: string
  profile: Profile
  customer: Customer
  billTo: BillTo
}

interface Profile {
  customerProfileId: string
}

interface Customer {
  email: string
}

interface BillTo {
  firstName: string
  lastName: string
  company: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}

interface HostedPaymentSettings {
  setting: Setting[]
}

interface Setting {
  settingName: string
  settingValue: string
}

// Example:
// {
//   "getHostedPaymentPageRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     },
//     "transactionRequest": {
//       "transactionType": "authCaptureTransaction",
//       "amount": "20.00",
//       "profile": {
//         "customerProfileId": "123456789"
//       },
//       "customer": {
//         "email": "ellen@mail.com"
//       },
//       "billTo": {
//         "firstName": "Ellen",
//         "lastName": "Johnson",
//         "company": "Souveniropolis",
//         "address": "14 Main Street",
//         "city": "Pecan Springs",
//         "state": "TX",
//         "zip": "44628",
//         "country": "US"
//       }
//     },
//     "hostedPaymentSettings": {
//       "setting": [{
//         "settingName": "hostedPaymentReturnOptions",
//         "settingValue": "{\"showReceipt\": true, \"url\": \"https://mysite.com/receipt\", \"urlText\": \"Continue\", \"cancelUrl\": \"https://mysite.com/cancel\", \"cancelUrlText\": \"Cancel\"}"
//       }, {
//         "settingName": "hostedPaymentButtonOptions",
//         "settingValue": "{\"text\": \"Pay\"}"
//       }, {
//         "settingName": "hostedPaymentStyleOptions",
//         "settingValue": "{\"bgColor\": \"blue\"}"
//       }, {
//         "settingName": "hostedPaymentPaymentOptions",
//         "settingValue": "{\"cardCodeRequired\": false, \"showCreditCard\": true, \"showBankAccount\": true}"
//       }, {
//         "settingName": "hostedPaymentSecurityOptions",
//         "settingValue": "{\"captcha\": false}"
//       }, {
//         "settingName": "hostedPaymentShippingAddressOptions",
//         "settingValue": "{\"show\": false, \"required\": false}"
//       }, {
//         "settingName": "hostedPaymentBillingAddressOptions",
//         "settingValue": "{\"show\": true, \"required\": false}"
//       }, {
//         "settingName": "hostedPaymentCustomerOptions",
//         "settingValue": "{\"showEmail\": false, \"requiredEmail\": false, \"addPaymentProfile\": true}"
//       }, {
//         "settingName": "hostedPaymentOrderOptions",
//         "settingValue": "{\"show\": true, \"merchantName\": \"G and S Questions Inc.\"}"
//       }, {
//         "settingName": "hostedPaymentIFrameCommunicatorUrl",
//         "settingValue": "{\"url\": \"https://mysite.com/special\"}"
//       }]
//     }
//   }
// }
