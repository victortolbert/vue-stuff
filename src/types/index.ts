import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Attendee {
  id: string
  name: string
}

export interface BillTo {
  FirstName?: string
  LastName?: string
  Company?: string
  Address?: string
  PhoneNumber?: string
  FaxNumber?: string | null
  City?: string
  State?: string
  Zip?: string
  Country?: string
}

export interface BasicFilter {
  value: string
  keys: string[]
  exact?: boolean
}

export interface CreditCard {
  CardNumber?: string
  ExpirationDate?: string
  ExpirationMonth?: string
  ExpirationYear?: string
  CardCode?: string | null
  CardType?: string
  IssuerNumber?: string | number
}

export interface CustomFilter {
  value?: unknown
  custom: (value: any, row: Record<string, any>) => boolean
}

export type CustomFilterFunction =
  (value: any, row: Record<string, any>) => boolean

export type CustomSort = ((a: any, b: any, sortOrder: SortOrder) => number)

export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  organizer: string
  attendees: Attendee[]
}

export interface Payment {
  CreditCard: CreditCard
}

export interface PaymentProfile {
  PaymentAmount?: number
  BillTo: BillTo
  Payment: Payment
  DefaultPaymentProfile?: boolean
  CustomerProfileId?: string | number
  CustomerPaymentProfileId?: string | number
  OriginalNetworkTransId?: string
  OriginalAuthAmount?: string
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export enum SortOrder {
  DESC = -1,
  NONE = 0,
  ASC = 1,
}

export interface TableState {
  rows: any[]
  rowsPrePagination: any[]
  selectedRows: any[]
}

export interface MerchantAuthentication {
  name: string
  transactionKey: string
}

// export interface TransactionRequest {
//   transactionType: string
//   amount: string
//   payment: Payment
//   billTo: BillTo
// }
