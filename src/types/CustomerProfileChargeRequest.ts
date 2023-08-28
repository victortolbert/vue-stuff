import type { MerchantAuthentication } from '.'

export interface CustomerProfileChargeRequest {
  merchantAuthentication: MerchantAuthentication
  refId?: string
  transactionRequest: TransactionRequest
}

interface TransactionRequest {
  transactionType: string
  amount: string
  profile: Profile
  lineItems: LineItem[]
  processingOptions: ProcessingOptions
  subsequentAuthInformation: SubsequentAuthInformation
  authorizationIndicatorType: string
}

interface Profile {
  customerProfileId: string
  paymentProfile: PaymentProfile
}

interface PaymentProfile {
  paymentProfileId: string
}

interface LineItem {
  itemId: string
  name: string
  description: string
  quantity: string
  unitPrice: string
}

interface ProcessingOptions {
  isSubsequentAuth: string
}

interface SubsequentAuthInformation {
  originalNetworkTransId: string
  originalAuthAmount: string
  reason: string
}

// Example:
// {
//   "createTransactionRequest": {
//     "merchantAuthentication": {
//       "name": "9bSaKC66uHg",
//       "transactionKey": "8xszx7B7674QxHqe"
//     },
//     "refId": "123456",
//     "transactionRequest": {
//       "transactionType": "authCaptureTransaction",
//       "amount": "45",
//       "profile": {
//         "customerProfileId": "40338125",
//         "paymentProfile": {
//           "paymentProfileId": "1000177237"
//         }
//       },
//       "lineItems": {
//         "lineItem": {
//           "itemId": "1",
//           "name": "vase",
//           "description": "Cannes logo",
//           "quantity": "18",
//           "unitPrice": "45.00"
//         }
//       },
//       "processingOptions": {
//         "isSubsequentAuth": "true"
//       },
//       "subsequentAuthInformation": {
//         "originalNetworkTransId": "123456789123456",
//         "originalAuthAmount": "45.00",
//         "reason": "resubmission"
//       },
//       "authorizationIndicatorType": {
//         "authorizationIndicator": "final"
//       }
//     }
//   }
// }
