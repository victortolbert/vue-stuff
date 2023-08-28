<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://jstest.authorize.net/v3/AcceptUI.js',
    },
  ],
})

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

function paymentFormUpdate(opaqueData: any) {
  (document.getElementById('dataDescriptor') as HTMLInputElement).value = opaqueData.dataDescriptor

  ;(document.getElementById('dataValue') as HTMLInputElement).value = opaqueData.dataValue

  // If using your own form to collect the sensitive data from the customer,
  // blank out the fields before submitting them to your server.
  // document.getElementById("cardNumber").value = "";
  // document.getElementById("expMonth").value = "";
  // document.getElementById("expYear").value = "";
  // document.getElementById("cardCode").value = "";

  ;(document.getElementById('paymentForm') as HTMLFormElement).submit()
}
</script>

<template>
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
      data-billingAddressOptions="{&quot;show&quot;:true, &quot;required&quot;:false}"
      data-apiLoginID="YOUR API LOGIN ID"
      data-clientKey="YOUR PUBLIC CLIENT KEY"
      data-acceptUIFormBtnTxt="Submit"
      data-acceptUIFormHeaderTxt="Card Information"
      data-responseHandler="responseHandler"
    >
      Pay
    </button>
  </form>
</template>
