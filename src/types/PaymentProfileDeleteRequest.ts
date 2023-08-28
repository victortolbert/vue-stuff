import type { MerchantAuthentication } from '.'

export interface PaymentProfileDeleteRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  customerPaymentProfileId: string
}

// Example:
// {
//   "deleteCustomerPaymentProfileRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     },
//     "customerProfileId": "10000",
//     "customerPaymentProfileId": "20000"
//   }
// }
