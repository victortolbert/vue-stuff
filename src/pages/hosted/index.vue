<script setup lang="ts">
import axios from 'axios'
import type { MerchantAuthentication } from '~/types'
import type { HostedPaymentPageGetRequest } from '~/types/HostedPaymentPageGetRequest'

const apiLoginID = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'
const customerProfileId = ref('514306819')
const appUrl = 'https://localhost:5011'
const requestUrl = 'https://apitest.authorize.net/xml/v1/request.api'
const hostedPaymentPage = ref()

// const firstName = ref('Victor')
// const lastName = ref('Tolbert')
// const email = ref('victor.tolbert@gmail.com')
// const company = ref('VTi Consulting')
// const address = ref('1547 Boulder Walk Drive SE')
// const city = ref('Atlanta')
// const state = ref('GA')
// const zip = ref('30316')
// const country = ref('US')

const form = reactive({
  exemplarUserId: '9999',
  customerProfileId: '514306819',
  paymentProfile: '521405605',
  authorizeNetPaymentProfile: '521405605',
  firstName: 'Victor',
  lastName: 'Tolbert',
  email: 'victor.tolbert@gmail.com',
  company: 'VTi Consulting',
  address: '1547 Boulder Walk Drive SE',
  city: 'Atlanta',
  state: 'GA',
  zip: '30316',
  country: 'US',
  amount: '100.00',
})

/**
 *
 *  The `getHostedPaymentPageRequest` call contains two primary elements:
 *
 *  `transactionRequest` Required.
 *      Contains information about the transaction.
 *
 *  `hostedPaymentSettings` Required.
 *      Contains parameters that control the payment form for that transaction.
 *
 *  The transactionRequest element contains transaction details and values that
 *  can be used to populate the form fields. It uses the same child elements as
 *  the transactionRequest element in createTransactionRequest. Only the
 *  transactionType and amount elements are required.
 *
 *  Important: No form field is displayed if its corresponding element in
 *  transactionRequest is absent or set to a NULL value.
 */
const getHostedPaymentPageRequest: HostedPaymentPageGetRequest = {
  merchantAuthentication: {
    name: apiLoginID,
    transactionKey,
  },
  transactionRequest: {
    transactionType: 'authCaptureTransaction',
    amount: form.amount,
    profile: {
      customerProfileId: form.customerProfileId,
    },
    customer: {
      email: form.email,
    },
    billTo: {
      firstName: form.firstName,
      lastName: form.lastName,
      company: form.company,
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      country: form.country,
    },
  },
  hostedPaymentSettings: {
    setting: [
      {
        settingName: 'hostedPaymentReturnOptions',
        settingValue: '{"showReceipt": true, "url": "https://demo.test:5080/receipt", "urlText": "Continue", "cancelUrl": "https://demo.test:5080/hosted", "cancelUrlText": "Cancel"}',
      },
      {
        settingName: 'hostedPaymentButtonOptions',
        settingValue: '{"text": "Pay"}',
      },
      {
        settingName: 'hostedPaymentStyleOptions',
        settingValue: '{"bgColor": "#002894"}',
      },
      {
        settingName: 'hostedPaymentPaymentOptions',
        settingValue: '{"cardCodeRequired": false, "showCreditCard": true, "showBankAccount": false}',
      },
      {
        settingName: 'hostedPaymentSecurityOptions',
        settingValue: '{"captcha": false}',
      },
      {
        settingName: 'hostedPaymentShippingAddressOptions',
        settingValue: '{"show": false, "required": false}',
      },
      {
        settingName: 'hostedPaymentBillingAddressOptions',
        settingValue: '{"show": true, "required": false}',
      },
      {
        settingName: 'hostedPaymentCustomerOptions',
        settingValue: '{"showEmail": false, "requiredEmail": false, "addPaymentProfile": true}',
      },
      {
        settingName: 'hostedPaymentOrderOptions',
        settingValue: '{"show": true, "merchantName": "Hancock Claims"}',
      },
      {
        settingName: 'hostedPaymentIFrameCommunicatorUrl',
        settingValue: '{"url": "https://demo.test:5080/special"}',
      },
    ],
  },
}

const getHostedPaymentPageRequestData = {
  getHostedPaymentPageRequest,
}

async function getHostedPaymentPage() {
  const { data } = await axios.post(requestUrl, getHostedPaymentPageRequestData)
  console.log({ hostedPaymentPage: data })
  hostedPaymentPage.value = data
}

getHostedPaymentPage()
</script>

<template>
  <div>
    <h1>Accept-Hosted Payment Form</h1>
    <input id="inputtoken" type="text" :value="hostedPaymentPage?.token">

    <form id="formAuthorizeNetTestPage" method="post" action="https://test.authorize.net/payment/payment" name="formAuthorizeNetTestPage">
      <input id="redirectToken" type="hidden" name="token" :value="hostedPaymentPage?.token">
      Redirect-Continue to Authorize.net to Payment Page

      Bill To

      <div class="form-group">
        <label for="customer-profile-id">Customer Profile ID</label>
        <div class="mt-1">
          <input id="customer-profile-id" v-model="form.customerProfileId" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="first-name">First name</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.firstName" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="last-name">Last name</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.lastName" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.email" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="company">Company</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.company" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.address" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.city" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="state">State</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.state" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="zip">Zip</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.zip" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="country">Country</label>
        <div class="mt-1">
          <input id="first-name" v-model="form.country" type="text">
        </div>
      </div>
      <div class="form-group">
        <label for="amount">Amount</label>
        <div class="mt-1">
          <input id="amount" v-model="form.amount" type="text">
        </div>
      </div>

      <button id="btnContinue" onclick="">
        Continue to next page
      </button>

      <div class="text-xs">
        <pre>{{ hostedPaymentPage }}</pre>
      </div>
    </form>
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
