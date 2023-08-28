import type { MerchantAuthentication } from '.'

export interface CustomerProfileGetRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  includeIssuerInfo?: string
}

// Example:
// {
//   "getCustomerProfileRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     },
//     "customerProfileId": "10000",
//     "includeIssuerInfo": "true"
//   }
// }
