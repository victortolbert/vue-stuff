import type { MerchantAuthentication } from '.'

export interface CustomerProfileDeleteRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
}

// {
//   "deleteCustomerProfileRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     },
//     "customerProfileId": "10000"
//   }
// }
