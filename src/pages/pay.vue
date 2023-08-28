<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://jstest.authorize.net/v1/Accept.js',
      async: true,
    },
  ],
})

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
    clientKey: 'YOUR PUBLIC CLIENT KEY',
    apiLoginID: 'YOUR API LOGIN ID',
  }

  const cardData: CardData = {
    cardNumber: (document.getElementById('cardNumber') as HTMLInputElement).value,
    month: (document.getElementById('expMonth') as HTMLInputElement).value,
    year: (document.getElementById('expYear') as HTMLInputElement).value,
    cardCode: (document.getElementById('cardCode') as HTMLInputElement).value,
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
  (document.getElementById('dataDescriptor') as HTMLInputElement).value = opaqueData.dataDescriptor;
  (document.getElementById('dataValue') as HTMLInputElement).value = opaqueData.dataValue;

  // If using your own form to collect the sensitive data from the customer,
  // blank out the fields before submitting them to your server.
  (document.getElementById('cardNumber') as HTMLInputElement).value = '';
  (document.getElementById('expMonth') as HTMLInputElement).value = '';
  (document.getElementById('expYear') as HTMLInputElement).value = '';
  (document.getElementById('cardCode') as HTMLInputElement).value = '';
  (document.getElementById('accountNumber') as HTMLInputElement).value = '';
  (document.getElementById('routingNumber') as HTMLInputElement).value = '';
  (document.getElementById('nameOnAccount') as HTMLInputElement).value = '';
  (document.getElementById('accountType') as HTMLInputElement).value = '';

  (document.getElementById('paymentForm') as HTMLFormElement).submit()
}
</script>

<template>
  <form
    id="paymentForm"
    method="POST"
    action="https://YourServer/PathToExistingPaymentProcessingScript"
  >
    <input id="cardNumber" type="text" name="cardNumber" placeholder="cardNumber">
    <input id="expMonth" type="text" name="expMonth" placeholder="expMonth">
    <input id="expYear" type="text" name="expYear" placeholder="expYear">
    <input id="cardCode" type="text" name="cardCode" placeholder="cardCode">
    <input id="accountNumber" type="text" name="accountNumber" placeholder="accountNumber">
    <input id="routingNumber" type="text" name="routingNumber" placeholder="routingNumber">
    <input id="nameOnAccount" type="text" name="nameOnAccount" placeholder="nameOnAccount">
    <input id="accountType" type="text" name="accountType" placeholder="accountType">
    <input id="dataValue" type="hidden" name="dataValue">
    <input id="dataDescriptor" type="hidden" name="dataDescriptor">
    <button type="button" @click="sendPaymentDataToAnet()">
      Pay
    </button>
  </form>
</template>
