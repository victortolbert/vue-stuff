<script setup lang="ts">
import axios from 'axios'
import type { MerchantAuthentication } from '~/types'

import type { CustomerProfileCreateRequest } from '~/types/CustomerProfileCreateRequest'
import type { CustomerProfileGetRequest } from '~/types/CustomerProfileGetRequest'
import type { CustomerProfileIdsGetRequest } from '~/types/CustomerProfileIdsGetRequest'
import type { CustomerProfileUpdateRequest } from '~/types/CustomerProfileUpdateRequest'
import type { CustomerProfileDeleteRequest } from '~/types/CustomerProfileDeleteRequest'
import type { CustomerProfileChargeRequest } from '~/types/CustomerProfileChargeRequest'
import type { CustomerProfileFromTransactionCreateRequest } from '~/types/CustomerProfileFromTransactionCreateRequest'

import type { PaymentProfileCreateRequest } from '~/types/PaymentProfileCreateRequest'
import type { PaymentProfileGetRequest } from '~/types/PaymentProfileGetRequest'
import type { PaymentProfileListGetRequest } from '~/types/PaymentProfileListGetRequest'
import type { PaymentProfileUpdateRequest } from '~/types/PaymentProfileUpdateRequest'
import type { PaymentProfileDeleteRequest } from '~/types/PaymentProfileDeleteRequest'
import type { PaymentProfileValidateRequest } from '~/types/PaymentProfileValidateRequest'

import type { PaymentTransactionAcceptRequest } from '~/types/PaymentTransactionAcceptRequest'
import type { PaymentTransactionRefundRequest } from '~/types/PaymentTransactionRefundRequest'
import type { PaymentTransactionVoidRequest } from '~/types/PaymentTransactionVoidRequest'

import type { HostedPaymentPageGetRequest } from '~/types/HostedPaymentPageGetRequest'
import type { HostedProfilePageGetRequest } from '~/types/HostedProfilePageGetRequest'

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const formPostUrl = 'https://localhost:5080/form-post'
const apiLoginID = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'
const clientKey = '8nXVfbpEpDrKdgY37eULnXy4eACX5849XtNnvqk8L3aK4sE78PytKk3rnUaR685f'

const amex = '370000000000002'
const visa = '4111111111111111'
const mastercard = '5424000000000015'
const cardDeclineZipCode = '46282'

const customerProfileId = ref('514265598')
const paymentProfileId = ref('914085527')
const merchantCustomerId = ref('99999')
const shippingProfileId = '514907980'

const dataValue = ref('')
const dataDescriptor = ref('')
const cardNumber = ref('')
const expMonth = ref('01')
const expYear = ref('2025')
const cardCode = ref('')

const paymentFormElement = ref()
const cardNumberElement = ref('')
const expMonthElement = ref('')
const cardCodeElement = ref('')
const expYearElement = ref('')
const dataDescriptorElement = ref('')
const dataValueElement = ref()

const customerProfileIds = ref()
const paymentProfileList = ref()

const refId = '123456'

const customerProfile = ref()
const paymentProfile = ref()
const transaction = ref()

const description = 'Profile description here'
const email = 'test_user@email.com'
const validationMode = 'liveMode'
const opaqueData = ref()

const state = reactive({
  refId: '123456',
  customerProfileID: '514265598',
  merchantCustomerId: '070766',
})

const testCustomer1 = {
  id: '99999',
  profileId: '514265598',
  paymentProfileId: '914112811',
  shippingProfileId: '514907980',
}

const testCustomer2 = {
  id: '7766',
  profileId: '514265598',
  paymentProfileId: '521333121',
  shippingProfileId: '514886639',
}

const testCustomer3 = {
  id: '070766',
  profileId: '514265598',
  paymentProfileId: '914113633',
  shippingProfileId: undefined,
}

// CUSTOMER PROFILE

/// CREATE

const createCustomerProfileRequest: CustomerProfileCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  profile: {
    merchantCustomerId: merchantCustomerId.value,
    description,
    email,
    paymentProfiles: {
      customerType: 'individual',
      payment: {
        creditCard: {
          cardNumber: '4111111111111111',
          expirationDate: '2025-12',
        },
      },
    },
  },
  validationMode,
}
const createCustomerProfileRequest2: CustomerProfileCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  profile: {
    merchantCustomerId: merchantCustomerId.value,
    description,
    email,
    paymentProfiles: {
      customerType: 'individual',
      payment: {
        creditCard: {
          cardNumber: '4111111111111111',
          expirationDate: '2025-12',
        },
      },
    },
  },
  validationMode,
}

const createCustomerProfileRequestData = {
  createCustomerProfileRequest: createCustomerProfileRequest2,
}

const createCustomerProfileFromTransactionRequest: CustomerProfileFromTransactionCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  transId: '60019626972',
}

const createCustomerProfileFromTransactionRequestData = {
  createCustomerProfileFromTransactionRequest,
}

/// GET

const getCustomerProfileRequest: CustomerProfileGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  includeIssuerInfo: 'true',
}

const getCustomerProfileRequestData = {
  getCustomerProfileRequest,
}

const getCustomerProfileIdsRequest: CustomerProfileIdsGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
}

const getCustomerProfileIdsRequestData = {
  getCustomerProfileIdsRequest,
}

/// UPDATE

const updateCustomerProfileRequest: CustomerProfileUpdateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  profile: {
    merchantCustomerId: '99999',
    description: 'Updated Customer Profile Description',
    email: 'updated@example.com',
    customerProfileId: customerProfileId.value,
  },
}

const updateCustomerProfileRequestData = {
  updateCustomerProfileRequest,
}

/// DELETE

const deleteCustomerProfileRequest: CustomerProfileDeleteRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
}

const deleteCustomerProfileRequestData = {
  deleteCustomerProfileRequest,
}

/// CHARGE

const chargeCustomerProfileRequest: CustomerProfileChargeRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  transactionRequest: {
    transactionType: 'authCaptureTransaction',
    amount: '45',
    profile: {
      customerProfileId: customerProfileId.value,
      paymentProfile: {
        paymentProfileId: paymentProfileId.value,
      },
    },
    lineItems: {
      lineItem: {
        itemId: '1',
        name: 'vase',
        description: 'Cannes logo',
        quantity: '18',
        unitPrice: '45.00',
      },
    },
    processingOptions: {
      isSubsequentAuth: 'true',
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

}

const chargeCustomerProfileRequestData = {
  chargeCustomerProfileRequest,
}

// PAYMENT PROFILE

// CREATE

const createPaymentProfileRequest: PaymentProfileCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  paymentProfile: {
    billTo: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St.',
      city: 'Bellevue',
      state: 'WA',
      zip: '98004',
      country: 'US',
      phoneNumber: '000-000-0000',
    },
    payment: {
      creditCard: {
        cardNumber: '4111111111111111',
        expirationDate: '2023-12',
      },
    },
    defaultPaymentProfile: true,
  },
  validationMode,
}

const createPaymentProfileRequestData = {
  createCustomerPaymentProfileRequest: createPaymentProfileRequest,
}

/// GET

const getPaymentProfileRequest: PaymentProfileGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  customerPaymentProfileId: paymentProfile.value,
  includeIssuerInfo: 'true',
}

const getPaymentProfileRequestData = {
  getCustomerPaymentProfileRequest: getPaymentProfileRequest,
}

const getPaymentProfileListRequest: PaymentProfileListGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  searchType: 'cardsExpiringInMonth',
  month: '2025-12',
  sorting: {
    orderBy: 'id',
    orderDescending: 'false',
  },
  paging: {
    limit: '10',
    offset: '1',
  },
}

const getPaymentProfileListRequestData = {
  getCustomerPaymentProfileListRequest: getPaymentProfileListRequest,
}

/// UPDATE

const updatePaymentProfileRequest: PaymentProfileUpdateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  paymentProfile: {
    billTo: {
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address: '123 Main St.',
      city: 'Bellevue',
      state: 'WA',
      zip: '98004',
      country: 'US',
      phoneNumber: '000-000-0000',
      faxNumber: '',
    },
    payment: {
      creditCard: {
        cardNumber: '4111111111111111',
        expirationDate: '2026-01',
      },
    },
    defaultPaymentProfile: false,
    customerPaymentProfileId: paymentProfileId.value,
  },
  validationMode,
}

const updatePaymentProfileRequestData = {
  updateCustomerPaymentProfileRequest: updatePaymentProfileRequest,
}

/// DELETE

const deletePaymentProfileRequest: PaymentProfileDeleteRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  customerPaymentProfileId: paymentProfileId.value,
}

const deletePaymentProfileRequestData = {
  deleteCustomerPaymentProfileRequest: deletePaymentProfileRequest,
}

/// VALIDATE

const validatePaymentProfileRequest: PaymentProfileValidateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  customerPaymentProfileId: paymentProfileId.value,
  validationMode,
}

const validatePaymentProfileRequestData = {
  validatePaymentProfileRequest,
}

// HOSTED PAYMENT PAGE
const getHostedPaymentPageRequest: HostedPaymentPageGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  transactionRequest: {
    transactionType: 'authCaptureTransaction',
    amount: '20.00',
    profile: {
      customerProfileId: customerProfileId.value,
    },
    customer: {
      email: 'ellen@mail.com',
    },
    billTo: {
      firstName: 'Ellen',
      lastName: 'Johnson',
      company: 'Souveniropolis',
      address: '14 Main Street',
      city: 'Pecan Springs',
      state: 'TX',
      zip: '44628',
      country: 'US',
    },
  },
  hostedPaymentSettings: {
    setting: [{
      settingName: 'hostedPaymentReturnOptions',
      settingValue: '{"showReceipt": true, "url": "https://mysite.com/receipt", "urlText": "Continue", "cancelUrl": "https://mysite.com/cancel", "cancelUrlText": "Cancel"}',
    }, {
      settingName: 'hostedPaymentButtonOptions',
      settingValue: '{"text": "Pay"}',
    }, {
      settingName: 'hostedPaymentStyleOptions',
      settingValue: '{"bgColor": "blue"}',
    }, {
      settingName: 'hostedPaymentPaymentOptions',
      settingValue: '{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": true}',
    }, {
      settingName: 'hostedPaymentSecurityOptions',
      settingValue: '{"captcha": false}',
    }, {
      settingName: 'hostedPaymentShippingAddressOptions',
      settingValue: '{"show": false, "required": false}',
    }, {
      settingName: 'hostedPaymentBillingAddressOptions',
      settingValue: '{"show": true, "required": false}',
    }, {
      settingName: 'hostedPaymentCustomerOptions',
      settingValue: '{"showEmail": false, "requiredEmail": false, "addPaymentProfile": true}',
    }, {
      settingName: 'hostedPaymentOrderOptions',
      settingValue: '{"show": true, "merchantName": "G and S Questions Inc."}',
    }, {
      settingName: 'hostedPaymentIFrameCommunicatorUrl',
      settingValue: '{"url": "https://mysite.com/special"}',
    }],
  },
}

const getHostedPaymentPageRequestData = {
  getHostedPaymentPageRequest,
}

// HOSTED PROFILE PAGE
const getHostedProfilePageRequest: HostedProfilePageGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfileId.value,
  hostedProfileSettings: {
    setting: [
      {
        settingName: 'hostedProfileReturnUrl',
        settingValue: 'https://returnurl.com/return/',
      },
      {
        settingName: 'hostedProfileReturnUrlText',
        settingValue: 'Continue to confirmation page.',
      },
      {
        settingName: 'hostedProfilePageBorderVisible',
        settingValue: 'true',
      },
    ],
  },
}

const getHostedProfilePageRequestData = {
  getHostedProfilePageRequest,
}

// PAYMENT TRANSACTIONS

const acceptPaymentTransactionRequest: PaymentTransactionAcceptRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  transactionRequest: {
    transactionType: 'authCaptureTransaction',
    amount: '5',
    payment: {
      opaqueData: opaqueData.value,
    },
    lineItems: {
      lineItem: {
        itemId: '1',
        name: 'vase',
        description: 'Cannes logo',
        quantity: '18',
        unitPrice: '45.00',
      },
    },
    poNumber: '456654',
    billTo: {
      firstName: 'Ellen',
      lastName: 'Johnson',
      company: 'Souveniropolis',
      address: '14 Main Street',
      city: 'Pecan Springs',
      state: 'TX',
      zip: '44628',
      country: 'US',
    },
    shipTo: {
      firstName: 'China',
      lastName: 'Bayles',
      company: 'Thyme for Tea',
      address: '12 Main Street',
      city: 'Pecan Springs',
      state: 'TX',
      zip: '44628',
      country: 'US',
    },
    customerIP: '192.168.1.1',
    userFields: {
      userField: [
        {
          name: 'MerchantDefinedFieldName1',
          value: 'MerchantDefinedFieldValue1',
        },
        {
          name: 'favorite_color',
          value: 'blue',
        },
      ],
    },
  },
}

const acceptPaymentTransactionRequestData = {
  acceptPaymentTransactionRequest,
}

const refundPaymentTransactionRequest: PaymentTransactionRefundRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  transactionRequest: {
    transactionType: 'refundTransaction',
    amount: '5.00',
    payment: {
      creditCard: {
        cardNumber: '0015',
        expirationDate: 'XXXX',
      },
    },
    refTransId: '1234567890',
  },
}

const refundPaymentTransactionRequestData = {
  refundPaymentTransactionRequest,
}

const voidPaymentTransactionRequest: PaymentTransactionVoidRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId,
  transactionRequest: {
    transactionType: 'voidTransaction',
    refTransId: '1234567890',
  },

}

const voidPaymentTransactionRequestData = {
  voidPaymentTransactionRequest,
}

class CustomerProfile {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  includeIssuerInfo: string

  constructor(
    merchantAuthentication: MerchantAuthentication,
    customerProfileId: string,
    includeIssuerInfo: string,
  ) {
    this.merchantAuthentication = merchantAuthentication
    this.customerProfileId = customerProfileId
    this.includeIssuerInfo = includeIssuerInfo
  }

  getCustomerProfileRequest() {
    return {
      merchantAuthentication: this.merchantAuthentication,
      customerProfileId: this.customerProfileId,
      includeIssuerInfo: this.includeIssuerInfo,
    }
  }
}

const customerProfileRequest = new CustomerProfile({
  name: apiLoginID, transactionKey,
}, customerProfileId.value, 'true')

// console.log(customerProfileRequest.getCustomerProfileRequest())

// CUSTOMER PROFILE

/// CREATE

function createCustomerProfile() {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCustomerProfileRequestData),
  })
    .then(response => response.json())
    .then((result) => {
      console.log({ createCustomerProfile: result })
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

async function createCustomerProfileFromTransaction() {
  const { data } = await axios.post(url, createCustomerProfileFromTransactionRequestData)
  paymentProfile.value = data
}

/// GET

async function getCustomerProfile() {
  const { data } = await axios.post(url, getCustomerProfileRequestData)
  console.log({ customerProfile: data })
  customerProfile.value = data
}

async function getCustomerProfileIds() {
  const { data } = await axios.post(url, getCustomerProfileIdsRequestData)
  console.log({ customerProfileIds: data })
  customerProfileIds.value = data
}

/// UPDATE

async function updateCustomerProfile() {
  const { data } = await axios.post(url, updateCustomerProfileRequestData)
  customerProfile.value = data
}

/// DELETE

async function deleteCustomerProfile() {
  const { data } = await axios.post(url, deleteCustomerProfileRequestData)
  customerProfile.value = data
}

/// CHARGE

async function chargeCustomerProfile() {
  const { data } = await axios.post(url, chargeCustomerProfileRequestData)
  customerProfile.value = data
}

// PAYMENT PROFILE

/// CREATE

async function createPaymentProfile() {
  const { data } = await axios.post(url, createPaymentProfileRequestData)
  paymentProfile.value = data
}

/// GET

async function getPaymentProfile() {
  const { data } = await axios.post(url, getPaymentProfileRequestData)
  paymentProfile.value = data
}

async function getPaymentProfileList() {
  const { data } = await axios.post(url, getPaymentProfileListRequestData)
  paymentProfileList.value = data
}

/// UPDATE

async function updatePaymentProfile() {
  const { data } = await axios.post(url, updatePaymentProfileRequestData)
  paymentProfile.value = data
}

/// DELETE

async function deletePaymentProfile() {
  const { data } = await axios.post(url, deletePaymentProfileRequestData)
  paymentProfile.value = data
}

/// VALIDATE

async function validatePaymentProfile() {
  const { data } = await axios.post(url, validatePaymentProfileRequestData)
  paymentProfile.value = data
}

// TRANSACTION REQUESTS

async function acceptPaymentTransaction() {
  const { data } = await axios.post(url, acceptPaymentTransactionRequestData)
  transaction.value = data
}

async function refundPaymentTransaction() {
  const { data } = await axios.post(url, refundPaymentTransactionRequestData)
  transaction.value = data
}

async function voidPaymentTransaction() {
  const { data } = await axios.post(url, voidPaymentTransactionRequestData)
  transaction.value = data
}

// const acceptPaymentTransaction = {
//   createTransactionRequest: {
//     merchantAuthentication: {
//       name: '8dzC8Xb48hf',
//       transactionKey: '5s59CE9D9Jb4Cmwr',
//     },
//     refId: '123456',
//     transactionRequest: acceptTransactionRequest,
//   },
// }

// const acceptTransactionRequest = {
//   transactionType: 'authCaptureTransaction',
//   amount: '5',
//   payment: {
//     opaqueData: {
//       dataDescriptor: 'COMMON.ACCEPT.INAPP.PAYMENT',
//       dataValue: '1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000',
//     },
//   },
//   lineItems: {
//     lineItem: {
//       itemId: '1',
//       name: 'vase',
//       description: 'Cannes logo',
//       quantity: '18',
//       unitPrice: '45.00',
//     },
//   },
//   poNumber: '456654',
//   billTo: {
//     firstName: 'Ellen',
//     lastName: 'Johnson',
//     company: 'Souveniropolis',
//     address: '14 Main Street',
//     city: 'Pecan Springs',
//     state: 'TX',
//     zip: '44628',
//     country: 'US',
//   },
//   shipTo: {
//     firstName: 'China',
//     lastName: 'Bayles',
//     company: 'Thyme for Tea',
//     address: '12 Main Street',
//     city: 'Pecan Springs',
//     state: 'TX',
//     zip: '44628',
//     country: 'US',
//   },
//   customerIP: '192.168.1.1',
//   userFields: {
//     userField: [
//       {
//         name: 'MerchantDefinedFieldName1',
//         value: 'MerchantDefinedFieldValue1',
//       },
//       {
//         name: 'favorite_color',
//         value: 'blue',
//       },
//     ],
//   },
// }

// watch(customerProfile, (newVal) => {
//   getCustomerProfile()
// })

// watch(paymentProfile, (newVal) => {
//   getPaymentProfile()
// })

// watch(customerProfileIds, (newVal) => {
//   getCustomerProfileIds()
// })

getCustomerProfile()
getCustomerProfileIds()
getPaymentProfile()
getPaymentProfileList()

interface AuthData {
  clientKey: string
  apiLoginID: string
}

interface CardData {
  cardNumber: string
  month: string
  year: string
  cardCode?: string
  zip?: string
  fullName?: string
}

interface SecureData {
  authData: AuthData
  cardData: CardData
}
function sendPaymentDataToAnet() {
  const authData: AuthData = {
    clientKey,
    apiLoginID,
  }

  const cardData: CardData = {
    cardNumber: cardNumber.value,
    month: expMonth.value,
    year: expYear.value,
    cardCode: cardCode.value,
  }

  const secureData: SecureData = {
    authData,
    cardData,
  }

  Accept.dispatchData(secureData, responseHandler)

  function responseHandler(response: any) {
    if (response.messages.resultCode === 'Error') {
      let i = 0
      while (i < response.messages.message.length) {
        console.log(
          `${response.messages.message[i].code}: ${response.messages.message[i].text}`,
        )
        i = i + 1
      }
    }
    else {
      paymentFormUpdate(response.opaqueData)
    }
  }
}

function paymentFormUpdate(opaqueData: any) {
  dataDescriptor.value = opaqueData.dataDescriptor
  dataValue.value = opaqueData.dataValue

  // If using your own form to collect the sensitive data from the customer,
  // blank out the fields before submitting them to your server.
  cardNumberElement.value = ''
  expMonthElement.value = ''
  expYearElement.value = ''
  cardCodeElement.value = ''

  paymentFormElement.value.submit()
}
</script>

<template>
  <form
    id="paymentForm"
    ref="paymentFormElement"
    method="GET"
    :action="formPostUrl"
  >
    <input id="dataValue" ref="dataValue" type="hidden" name="dataValue">
    <input id="dataDescriptor" ref="dataDescriptor" type="hidden" name="dataDescriptor">

    <div class="grid max-w-lg w-full gap-4">
      <fieldset class="grid gap-4">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <div class="mt-1">
            <input id="cardNumber" ref="cardNumberElement" v-model="cardNumber" type="text" name="cardNumber" placeholder="cardNumber">
          </div>
        </div>
        <div class="form-group">
          <label for="expMonth">Exp. Month</label>
          <div class="mt-1">
            <input id="expMonth" ref="expMonthElement" v-model="expMonth" type="text" name="expMonth" placeholder="expMonth">
          </div>
        </div>
        <div class="form-group">
          <label for="expYear">Exp. Year</label>
          <div class="mt-1">
            <input id="expYear" ref="expYearElement" v-model="expYear" type="text" name="expYear" placeholder="expYear">
          </div>
        </div>
        <div class="form-group">
          <label for="cardCode">Card Code</label>
          <div class="mt-1">
            <input id="cardCode" ref="cardCodeElement" v-model="cardCode" type="text" name="cardCode" placeholder="cardCode">
          </div>
        </div>
      </fieldset>
      <button type="button" @click="sendPaymentDataToAnet()">
        Pay
      </button>
    </div>
  </form>

  <form action="" class="grid mt-8 max-w-lg w-full gap-4">
    <div>
      <label for="customer-profile-id">
        Customer Profile ID
      </label>
      <div>
        <input id="customer-profile-id" v-model="customerProfileId" type="text">
      </div>
    </div>
    <div>
      <label for="payment-profile-id">Customer Payment Profile ID</label>
      <div class="mt-1">
        <input id="payment-profile-id" v-model="paymentProfileId" type="text">
      </div>
    </div>
    <div>
      <label for="merchant-customer-id">Merchant Customer ID</label>
      <div class="mt-1">
        <input id="merchant-customer-id" v-model="merchantCustomerId" type="text">
      </div>
    </div>

    <div>
      <label for="customer-profile-id">
        Customer Profile ID
      </label>
      <div>
        <select id="customer-profile-id" v-model="customerProfileId">
          <option value="514265598">
            514265598
          </option>
          <option value="514265598">
            514265598
          </option>
          <option value="514265598">
            514265598
          </option>
        </select>
      </div>
    </div>
    <div>
      <label for="merchant-customer-id">
        Merchant Customer ID
      </label>
      <div>
        <select id="merchant-customer-id" v-model="merchantCustomerId">
          <option value="99999">
            99999
          </option>
          <option value="070766">
            070766
          </option>
          <option value="7766">
            7766
          </option>
          <option value="513454">
            513454
          </option>
        </select>
      </div>
    </div>
    <div>
      <label for="payment-profile-id">
        Payment Profile ID
      </label>
      <div>
        <select id="payment-profile-id" v-model="paymentProfileId">
          <option value="914085527">
            914085527
          </option>
          <option value="513454">
            513454
          </option>
        </select>
      </div>
    </div>
  </form>

  <div class="text-xs">
    <div class="mt-8 flex gap-8">
      <button @click="getCustomerProfile">
        Get Customer Profile
      </button>

      <button @click="getCustomerProfileIds">
        Get Customer Profile Ids
      </button>

      <button @click="createCustomerProfile">
        Create Customer Profile
      </button>

      <button @click="updateCustomerProfile">
        Update Customer Profile
      </button>
      <button @click="deleteCustomerProfile">
        Delete Customer Profile
      </button>
    </div>
    <div class="mt-8 flex gap-8">
      <button @click="createPaymentProfile">
        Create Payment Profile
      </button>
      <button @click="getPaymentProfile">
        Get Payment Profile
      </button>
      <button @click="getPaymentProfileList">
        Get Payment Profile List
      </button>
      <button @click="updatePaymentProfile">
        Update Payment Profile
      </button>
      <button @click="deletePaymentProfile">
        Delete Payment Profile
      </button>
    </div>
  </div>

  <div class="grid grid-cols-4 mt-8 gap-4 text-xs">
    <section v-if="customerProfile">
      <pre>{{ customerProfile }}</pre>
    </section>
    <section v-if="customerProfileIds">
      <pre>{{ customerProfileIds }}</pre>
    </section>
    <section v-if="paymentProfile">
      <pre>{{ paymentProfile }}</pre>
    </section>
    <section v-if="paymentProfileList">
      <pre>{{ paymentProfileList }}</pre>
    </section>
  </div>
</template>

<style scoped>
label {
  @apply text-xs block;
}
input {
  @apply block text-sm w-full border rounded px-2 py-1;
}
select {
  @apply block text-sm w-full border rounded px-2 py-1;
}
button {
  @apply bg-primary-500 text-sm text-white rounded px-4 py-1 whitespace-nowrap;
}
</style>
