<script setup lang="ts">
import axios from 'axios'
import type { CreateCustomerProfileRequest, MerchantAuthentication } from '~/types/payment'

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const loginId = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'
const customerProfileId = '914706436'
const customerProfile = ref()
const profile = ref()
const refId = '123456'
const merchantCustomerId = '070766'
const description = 'Profile description here'
const email = 'test_user@email.com'
const validationMode = 'testMode'

const state = reactive({
  refId: '123456',
  customerProfileID: '914706436',
  merchantCustomerId: '070766',
})

const acceptTransactionRequest = {
  transactionType: 'authCaptureTransaction',
  amount: '5',
  payment: {
    opaqueData: {
      dataDescriptor: 'COMMON.ACCEPT.INAPP.PAYMENT',
      dataValue: '1234567890ABCDEF1111AAAA2222BBBB3333CCCC4444DDDD5555EEEE6666FFFF7777888899990000',
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
}

const acceptPaymentTransaction = {
  createTransactionRequest: {
    merchantAuthentication: {
      name: '8dzC8Xb48hf',
      transactionKey: '5s59CE9D9Jb4Cmwr',
    },
    refId: '123456',
    transactionRequest: acceptTransactionRequest,
  },
}

const getCustomerProfileRequestData = {
  getCustomerProfileRequest: {
    merchantAuthentication: {
      name: loginId,
      transactionKey,
    },
    customerProfileId,
    includeIssuerInfo: 'true',
  },
}

const createCustomerProfileRequest: CreateCustomerProfileRequest = {
  merchantAuthentication: {
    name: loginId,
    transactionKey,
  },
  refId,
  profile: {
    merchantCustomerId,
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
  createCustomerProfileRequest,
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

const customerProfileRequest = new CustomerProfile(
  { name: loginId, transactionKey }, customerProfileId, 'true',
)

console.log(customerProfileRequest.getCustomerProfileRequest())

async function getCustomerProfile() {
  const { data } = await axios.post(url, getCustomerProfileRequestData)
  customerProfile.value = data
}

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
      console.log(result)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

getCustomerProfile()
</script>

<template>
  <section v-if="customerProfile">
    <!-- getCustomerProfile Response -->
    <!-- <pre>{{ customerProfile }}</pre> -->

    <pre>{{ customerProfile.profile }}</pre>
  </section>
</template>
