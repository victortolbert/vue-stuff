<script setup>
useHead({
  script: [
    {
      src: 'https://jstest.authorize.net/v3/AcceptUI.js',
      defer: true,
    },
  ],
})

const apiLoginID = '8dzC8Xb48hf'
const transactionKey = '5s59CE9D9Jb4Cmwr'
const clientKey = '8nXVfbpEpDrKdgY37eULnXy4eACX5849XtNnvqk8L3aK4sE78PytKk3rnUaR685f'

function responseHandler(response) {
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

function paymentFormUpdate(opaqueData) {
  document.getElementById('dataDescriptor').value = opaqueData.dataDescriptor
  document.getElementById('dataValue').value = opaqueData.dataValue

  // If using your own form to collect the sensitive data from the customer,
  // blank out the fields before submitting them to your server.
  // document.getElementById("cardNumber").value = "";
  // document.getElementById("expMonth").value = "";
  // document.getElementById("expYear").value = "";
  // document.getElementById("cardCode").value = "";

  document.getElementById('paymentForm').submit()
}
</script>

<template>
  <NuxtLayout name="exemplar">
    <h1>Accept-Hosted Payment Form</h1>
    <form
      id="paymentForm"
      method="POST"
      action="https://YourServer/PathToExistingPaymentProcessingScript"
    >
      <input id="dataValue" type="hidden" name="dataValue">
      <input id="dataDescriptor" type="hidden" name="dataDescriptor">
      <button
        type="button"
        class="AcceptUI"
        data-billingAddressOptions="{'show': true, 'required': false}"
        :data-apiLoginID="apiLoginID"
        :data-clientKey="clientKey"
        data-acceptUIFormBtnTxt="Submit"
        data-acceptUIFormHeaderTxt="Card Information"
        data-paymentOptions="{'showCreditCard': true, 'showBankAccount': true}"
        data-responseHandler="responseHandler"
      >
        Pay
      </button>
    </form>
  </NuxtLayout>
</template>
