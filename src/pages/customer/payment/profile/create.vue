<script setup lang="ts">
import axios from 'axios'

import type { PaymentProfileCreateRequest } from '~/types/PaymentProfileCreateRequest'

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const apiLoginID = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'

const refId = '3'
const validationMode = 'testMode'

const merchantCustomerId = ref('3')
const customerProfileId = ref('514265598')
const paymentProfile = ref()

const email = ref('customer-3@example.com')
const description = ref('Customer 3')

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

async function createPaymentProfile() {
  const { data } = await axios.post(url, createPaymentProfileRequestData)
  paymentProfile.value = data
}

function onSubmit() {
  createPaymentProfile()
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h1>Create Customer Profile</h1>

    <p>Use this function to create a new customer profile including any customer payment profiles and customer shipping addresses.</p>

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

    <button>
      Create Customer Profile
    </button>
  </form>
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
