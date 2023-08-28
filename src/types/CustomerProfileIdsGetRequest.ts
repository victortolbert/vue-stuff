import type { MerchantAuthentication } from '.'

export interface CustomerProfileIdsGetRequest {
  merchantAuthentication: MerchantAuthentication
}

// Example:
// {
//   "getCustomerProfileIdsRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     }
//   }
// }
