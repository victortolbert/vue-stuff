import type { MerchantAuthentication } from '.'

export interface CreateCustomerProfileRequest {
  merchantAuthentication: MerchantAuthentication
  refId?: string
  profile: Profile
  validationMode?: ValidationMode
}

export interface Profile {
  merchantCustomerId: string
  description?: string
  email?: string
  paymentProfiles: PaymentProfile
}

export interface PaymentProfile {
  customerType?: CustomerType
  payment?: PaymentType
}

// type PaymentType = CreditCard | BankAccount | OpaqueData
export interface PaymentType {
  creditCard?: CreditCard
  bankAccount?: BankAccount
  opaqueData?: OpaqueData
}

export type CustomerType = 'individual' | 'business'
export type ValidationMode = 'none' | 'testMode' | 'liveMode'

export interface CreditCard {
  cardNumber: string
  expirationDate: string
}

export interface BankAccount {
  accountType: string
  routingNumber: string
  accountNumber: string
  nameOnAccount: string
  echeckType: string
  bankName: string
}

export interface OpaqueData {
  dataDescriptor: string
  dataValue: string
}
