<script setup lang="ts">
import axios from 'axios'
import type { CustomerProfileCreateRequest } from '~/types/CustomerProfileCreateRequest'
import type { PaymentProfileCreateRequest } from '~/types/PaymentProfileCreateRequest'
import type { CustomerProfileGetRequest } from '~/types/CustomerProfileGetRequest'

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

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const apiLoginID = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'
const clientKey = '8nXVfbpEpDrKdgY37eULnXy4eACX5849XtNnvqk8L3aK4sE78PytKk3rnUaR685f'
const validationMode = 'testMode'

const merchantCustomerId = ref('6')
const refId = ref(merchantCustomerId.value)

const email = ref(`customer-${merchantCustomerId.value}@example.com`)
const description = ref(`Customer ${merchantCustomerId.value}`)
const customerProfile = ref()
const paymentProfile = ref()
const form = reactive({
  billTo: {
    firstName: `Test ${merchantCustomerId.value}`,
    lastName: 'User',
    address: `${merchantCustomerId.value} Main St.`,
    city: 'Atlanta',
    state: 'GA',
    zip: '30316',
    country: 'US',
    phoneNumber: `${merchantCustomerId.value}00-000-0000`,
  },
})

const dataValue = ref('')
const dataDescriptor = ref('')
const cardNumber = ref('')
const expMonth = ref('01')
const expYear = ref('2025')
const cardCode = ref('111')

const paymentFormElement = ref()
const cardNumberElement = ref('')
const expMonthElement = ref('')
const cardCodeElement = ref('')
const expYearElement = ref('')

// Create Customer Profile

const createCustomerProfileRequest: CustomerProfileCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  refId: refId.value,
  profile: {
    merchantCustomerId: merchantCustomerId.value,
    description: description.value,
    email: email.value,
  },
}

const createCustomerProfileRequestData = {
  createCustomerProfileRequest,
}

async function createCustomerProfile() {
  const { data } = await axios.post(url, createCustomerProfileRequestData)
  console.log({ createCustomerProfile: data })
  customerProfile.value = data
}

// Get Customer Profile

const getCustomerProfileRequest: CustomerProfileGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfile.value?.customerProfileId,
  includeIssuerInfo: 'true',
}

const getCustomerProfileRequestData = {
  getCustomerProfileRequest,
}

async function getCustomerProfile() {
  const { data } = await axios.post(url, getCustomerProfileRequestData)
  console.log({ customerProfile: data })
  customerProfile.value = data
}

// Create Payment Profile

const createPaymentProfileRequest: PaymentProfileCreateRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  customerProfileId: customerProfile.value?.customerProfileId,
  paymentProfile: {
    billTo: form.billTo,
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

async function createPaymentProfile() {
  const { data } = await axios.post(url, createPaymentProfileRequestData)
  paymentProfile.value = data
}

function onSubmit() {
  // await createCustomerProfile()
  sendPaymentDataToAnet()
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
  cardNumber.value = ''
  expMonth.value = ''
  expYear.value = ''
  cardCode.value = ''

  // paymentFormElement.value.submit()
}
// getCustomerProfile()
</script>

<template>
  <div class="max-w-sm">
    <form v-if="customerProfile">
      <pre>{{ customerProfile }}</pre>
    </form>

    <form v-else @submit.prevent="onSubmit">
      <h1 class="text-lg">
        Create Customer Profile
      </h1>
      <p class="mt-2">
        Use this function to create a new customer profile including any customer payment profiles and customer shipping addresses.
      </p>
      <fieldset class="grid gap-4">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <div class="mt-1">
            <input id="cardNumber" ref="cardNumberElement" v-model="cardNumber" type="text" name="cardNumber" placeholder="cardNumber">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-8">
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
        </div>
      </fieldset>

      <button type="button" @click="sendPaymentDataToAnet()">
        Pay
      </button>

      <fieldset class="grid mt-8 gap-4">
        <div class="form-group">
          <label for="merchantCustomerId">Merchant Customer ID</label>
          <div class="mt-1">
            <input id="merchantCustomerId" v-model="merchantCustomerId" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <div class="mt-1">
            <input id="email" v-model="email" type="text">
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <div class="mt-1">
            <input id="description" v-model="description" type="text">
          </div>
        </div>
      </fieldset>

      <div class="mt-8">
        <button>
          Create Customer Profile
        </button>
      </div>
    </form>

    <form ref="paymentFormElement" @submit.prevent="onSubmit">
      <input id="dataValue" v-model="dataValue" type="text" name="dataValue">
      <input id="dataDescriptor" v-model="dataDescriptor" type="text" name="dataDescriptor">
      <fieldset class="grid gap-4">
        <div class="form-group">
          <label for="cardNumber">Card Number</label>
          <div class="mt-1">
            <input id="cardNumber" ref="cardNumberElement" v-model="cardNumber" type="text" name="cardNumber" placeholder="cardNumber">
          </div>
        </div>
        <div class="grid grid-cols-3 gap-8">
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
        </div>
      </fieldset>

      <button>
        Pay
      </button>
    </form>
  </div>
</template>

<style scoped>
label {
  @apply text-xs block;
}
input {
  @apply block text-sm w-full border border-gray-400 rounded px-2 py-1;
}
select {
  @apply block text-sm w-full border rounded px-2 py-1;
}
button {
  @apply bg-primary-500 text-sm text-white rounded px-4 py-1 whitespace-nowrap;
}
</style>
