import { ref } from 'vue'
import type { MerchantAuthentication } from '.'

export interface CustomerProfileFromTransactionCreateRequest {
  merchantAuthentication: MerchantAuthentication
  refId?: string
  transId: string
}

// Example:
// {
//   "createCustomerProfileFromTransactionRequest": {
//     "merchantAuthentication": {
//       "name": "5KP3u95bQpv",
//       "transactionKey": "346HZ32z3fP4hTG2"
//     },
//     "transId": "122"
//   }
// }
