import axios from 'axios'
import { last } from 'lodash-es'

import type {
  MerchantAuthentication,
  ValidationMode,
} from '~/types/authorize.net'

interface MerchantCustomerProfile {
  merchantCustomerId: string
  description: string
  email: string
}

interface OpaqueData {
  dataDescriptor: string
  dataValue: string
}

export interface CustomerPaymentProfileCreateRequest {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  paymentProfile: PaymentProfile
  validationMode: string
}

interface PaymentProfile {
  billTo: BillTo
  payment: Payment
  defaultPaymentProfile: boolean
}

interface BillTo {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  phoneNumber: string
}

interface Payment {
  creditCard?: CreditCard
  opaqueData?: OpaqueData
}

interface OpaqueData {
  dataDescriptor: string
  dataValue: string
}

interface CreditCard {
  cardNumber: string
  expirationDate: string
}

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const merchantCustomerId = ref('71001')
const customerPaymentProfileId = ref('521425778')
const customerProfileId = ref('514324677')
const isDefaultPaymentProfile = ref(true)
const validationMode: ValidationMode = 'testMode'

const merchantAuthentication: MerchantAuthentication = {
  name: import.meta.env.VITE_AUTHORIZE_NET_API_LOGIN_ID,
  transactionKey: import.meta.env.VITE_AUTHORIZE_NET_TRANSACTION_KEY,
}

const acceptRequest = ref({})

const apiClient = axios.create({
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export async function CreateCustomerProfile(
  merchantCustomerProfile: MerchantCustomerProfile,
  opaqueData: OpaqueData,
) {
  return await apiClient.post(url, {
    createCustomerProfileRequest: {
      merchantAuthentication,
      profile: {
        merchantCustomerId: merchantCustomerProfile.merchantCustomerId,
        description: merchantCustomerProfile.description,
        email: merchantCustomerProfile.email,
        paymentProfiles: {
          customerType: 'individual',
          payment: {
            opaqueData,
          },
        },
      },
      validationMode,
    },
  })
}

/**
 *
 * Create a customer profile, payment profile, and shipping profile from an
 * existing successful transaction.
 *
 * */
export async function CreateCustomerProfileFromTransaction(transId: string) {
  return await apiClient.post(url, {
    createCustomerProfileFromTransactionRequest: {
      merchantAuthentication,
      transId,
    },
  })
}

export async function GetCustomerProfile(
  customerProfileId: string = '514324677',
) {
  return await apiClient.post(url, {
    getCustomerProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      includeIssuerInfo: true,
    },
  })
}

export async function UpdateCustomerProfile(
  customerProfileId: string = '514324677',
  merchantCustomerProfile: MerchantCustomerProfile,
) {
  return await apiClient.post(url, {
    updateCustomerProfileRequest: {
      merchantAuthentication,
    },
    profile: {
      merchantCustomerId: merchantCustomerProfile.merchantCustomerId,
      description: merchantCustomerProfile.description,
      email: merchantCustomerProfile.email,
      customerProfileId,
    },
  },
  )
}

export async function DeleteCustomerProfile(customerProfileId: string) {
  return await apiClient.post(url, {
    deleteCustomerProfileRequest: {
      merchantAuthentication,
      customerProfileId,
    },
  })
}

/**
 *
 * Create a new customer payment profile for an existing customer profile.
 *
 * */
export async function CreateCustomerPaymentProfile(customerProfileId: string, paymentProfile: PaymentProfile) {
  return await apiClient.post(url, {
    createCustomerPaymentProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      paymentProfile,
      validationMode,
    },
  })
}

/**
 *
 * Retrieve the details of a customer payment profile associated with an
 * existing customer profile.
 *
 *  Important: If the payment profile has previously been set as the default
 *  payment profile, you can submit this request using `customerProfileId` as
 *  the only parameter. Submitting this request with only the customer profile ID
 *  will cause the information for the default payment profile to be returned
 *  if a default payment profile has been previously designated. If no payment
 *  profile has been designated as the default payment profile, failing to
 *  specify a payment profile will result in an error.
 *
 **/
export async function GetCustomerPaymentProfile(customerProfileId: string, customerPaymentProfileId?: string) {
  const requestData: any = {
    createCustomerPaymentProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      includeIssuerInfo: true,
    },
  }

  if (customerPaymentProfileId)
    requestData.createCustomerPaymentProfileRequest.customerPaymentProfileId = customerPaymentProfileId

  return await apiClient.post(url, requestData)
}

/**
 *  Update a payment profile for an existing customer profile.
 *
 *  Important: If some fields in this request are not submitted or are submitted
 *  with a blank value, the values in the original profile are removed. As a best
 *  practice to prevent this from happening, call getCustomerPaymentProfileRequest
 *  to receive all current information including masked payment information.
 *  Change the field or fields that you wish to update, and then reuse all the
 *  fields you received, with updates, in a call to
 *  updateCustomerPaymentProfileRequest.
 *
 *  To test the validity of new payment information, call
 *  `validateCustomerPaymentProfileRequest` after successfully updating the payment
 *  profile.
 **/
export async function UpdateCustomerPaymentProfile(
  customerProfileId: string,
  paymentProfile: PaymentProfile,
) {
  return await apiClient.post(url, {
    updateCustomerPaymentProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      paymentProfile,
      validationMode,
    },
  })
}

/**
 *
 * Delete a customer payment profile from an existing customer profile.
 *
 **/
export async function DeleteCustomerPaymentProfile() {
  return await apiClient.post(url, {
    deleteCustomerPaymentProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      customerPaymentProfileId,
    },
  })
}

/**
 * Generate a test transaction that verifies an existing customer payment
 * profile.
 *
 * No customer receipt emails are sent when the
 * validateCustomerPaymentProfileRequest function is called.
 *
 * */
export async function ValidateCustomerPaymentProfile(
  customerProfileId: string,
  customerPaymentProfileId: string,
) {
  return await apiClient.post(url, {
    validateCustomerPaymentProfileRequest: {
      merchantAuthentication,
      customerProfileId,
      customerPaymentProfileId,
      validationMode,
    },
  })
}

/**
 * Create an Accept Payment Transaction
 *
 * Use this function to create an Authorize.net payment transaction request,
 * using the Accept Payment nonce in place of card data.
 *
 */

/**
 * Authorize and capture a payment using a stored customer payment profile.
 *
 * Important: You can use Customer Profiles with `createTransactionRequest`
 * calls by using the profile field and its children as payment information.
 *
 **/
export async function ChargeCustomerProfile(
  customerProfileId: string,
  customerPaymentProfileId: string,
  amount: string,
) {
  return await apiClient.post(url, {
    createTransactionRequest: {
      merchantAuthentication,
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount,
        profile: {
          customerProfileId,
          paymentProfile: {
            paymentProfileId: customerPaymentProfileId,
          },
        },
        processingOptions: {
          isSubsequentAuth: true,
        },
        subsequentAuthInformation: {
          originalNetworkTransId: '123456789123456',
          originalAuthAmount: '45.00',
          reason: 'resubmission',

        },
        authorizationIndicatorType: {
          authorizationIndicator: 'final',
        },
      },
    },
  })
}

/**
 *
 * Refund a Transaction
 *
 * This transaction type is used to refund a customer for a transaction that
 * was successfully settled through the payment gateway. Note that credit card
 * information and bank account information are mutually exclusive, so you
 * should not submit both.
 *
 */
export async function RefundTransaction(
  cardNumber: string,
  expirationDate: string,
  refTransId: string,
  amount: string,
) {
  return await apiClient.post(url, {
    createTransactionRequest: {
      merchantAuthentication,
      transactionRequest: {
        transactionType: 'refundTransaction',
        amount,
        payment: {
          creditCard: {
            cardNumber,
            expirationDate,
          },
        },
        refTransId,
      },
    },
  })
}

/**
 *
 * Void a Transaction
 *
 * This transaction type can be used to cancel either an original transaction
 * that is not yet settled or an entire order composed of more than one
 * transaction. A Void prevents the transaction or the order from being sent
 * for settlement. A Void can be submitted against any other transaction type
 * */
export async function VoidTransaction(refTransId: string) {
  return await apiClient.post(url, {
    createTransactionRequest: {
      merchantAuthentication,
      transactionRequest: {
        transactionType: 'voidTransaction',
        refTransId,
      },
    },
  })
}

/**
 * Authorize a Credit Card
 *
 * Use this method to authorize a credit card payment. To actually charge the
 * funds you will need to follow up with a capture transaction.
 *
 * */

/**
 * Capture a Previously Authorized Amount
 *
 * Use this method to capture funds reserved with a previous
 * authOnlyTransaction transaction request.
 *
 * */
export async function CapturePreviouslyAuthorizedAmount(amount: string, refTransId: string) {
  return await apiClient.post(url, {
    createTransactionRequest: {
      merchantAuthentication,
      transactionRequest: {
        transactionType: 'priorAuthCaptureTransaction',
        amount,
        refTransId,
      },
    },
  })
}
