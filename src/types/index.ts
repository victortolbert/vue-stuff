export interface Attendee {
  id: string
  name: string
}

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

export interface BillTo {
  FirstName?: string
  LastName?: string
  Address?: string
  Company?: string
  PhoneNumber?: string
  FaxNumber?: string | null
  City?: string
  State?: string
  Zip?: string
  Country?: string
}

export interface Payment {
  CreditCard: CreditCard
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
