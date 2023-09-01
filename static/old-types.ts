export interface TransactionResponse {
  accountNumber: string
  accountType:
  | 'Visa'
  | 'MasterCard'
  | 'Discover'
  | 'AmericanExpress'
  | 'DinersClub'
  | 'JCB'
  | 'eCheck'

  authCode: string
  avsResultCode:
  | 'A'
  | 'B'
  | 'E'
  | 'G'
  | 'N'
  | 'P'
  | 'R'
  | 'S'
  | 'U'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  cvvResultCode: 'M' | 'N' | 'P' | 'S' | 'U'
  errors?: ReadonlyArray<{ errorCode: string; errorText: string }>
  messages: ReadonlyArray<{ code: string; description: string }>
  responseCode: '1' | '2' | '3' | '4'
  transId: string
}

export type Message =
  | {
    action: 'resizeWindow'
    width: number
    height: number
  }
  | {
    action: 'cancel'
  }
  | {
    action: 'transactResponse'
    response: string
  }

export enum AuthorizeNetScriptUrl {
  Production = 'https://js.authorize.net/v1/Accept.js',
  Sandbox = 'https://jstest.authorize.net/v1/Accept.js',
}

export interface FormType {
  cardNumber: string
  cardCode: string
  expDate: string
}

export interface State {
  apiErrors: string[]
  values: FormType
  focused?: keyof FormType
}

export interface PaymentProfile {
  id: string
  customerProfileId: string
}

export interface MerchantAuthentication {
  name: string
  transactionKey: string
}

export interface GetCustomerProfileRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  includeIssuerInfo?: boolean
}

export interface CreateCustomerProfileRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  PaymentProfiles: PaymentProfile[]
}

export interface CustomerProfileGetRequest {}
export interface CustomerProfileCreateRequest {}
export interface CustomerProfileUpdateRequest {}

export interface PaymentProfileGetRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  customerPaymentProfileId: string
  includeIssuerInfo?: boolean
}

export interface PaymentProfileCreateRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  paymentProfile: PaymentProfile
}
export interface PaymentProfileUpdateRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  paymentProfile: PaymentProfile
  validationMode: 'none' | 'testMode' | 'liveMode'
}

export interface PaymentProfileChargeRequest {
  merchantAuthentication: MerchantAuthentication
}

export interface TransactionCreateRequest {
  merchantAuthentication: MerchantAuthentication
  refId?: string
}

export interface TransactionRequest {
  transactionType: 'authCaptureTransaction' | 'authOnlyTransaction' | 'captureOnlyTransaction' | 'refundTransaction' | 'priorAuthCaptureTransaction' | 'voidTransaction'
  amount: number
}

export interface CustomerProfileCharge {
  customerProfileId: string
  customerPaymentProfileId: string
  paymentProfileCharge: PaymentProfileCharge
}

export interface PaymentProfileCharge {
  paymentProfileId: string
}

export interface LineItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export interface ProcessingOptions {
  isSubsequentAuth: string
}

export interface SubsequentAuthInformation {
  originalNetworkTransId: string
  originalAuthAmount: string
  reason: string
}

export interface AuthorizationIndicatorType {
  authorizationIndicator: string
}
