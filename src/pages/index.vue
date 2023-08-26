<script setup lang="ts">
const { t } = useI18n()
const customerProfile = ref(null)

const title = ref('')

title.value = t('pages.home')

useHead({
  title: () => title.value,
})
interface MerchantAuthentication {
  name: string
  transactionKey: string
}

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const loginId = '8d7Kz9Qt2t'
const transactionKey = '8T4YCA85hnn9rG26'
const customerProfileId = '514265624'

const data = {
  getCustomerProfileRequest: {
    merchantAuthentication: {
      name: loginId,
      transactionKey,
    },
    customerProfileId,
    includeIssuerInfo: 'true',
  },
}

class CustomerProfile {
  merchantAuthentication: MerchantAuthentication
  customerProfileId: string
  includeIssuerInfo: string

  constructor(
    merchantAuthentication: MerchantAuthentication,
    customerProfileId: string,
    includeIssuerInfo: string
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
  {
    name: loginId,
    transactionKey,
  },
  customerProfileId,
  'true'
)

console.log(customerProfileRequest.getCustomerProfileRequest())

async function getCustomerProfile() {
  const response =  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()
  customerProfile.value = result
  console.log(result)
  return result
}

console.log(getCustomerProfile())
</script>

<template>
  <section>
    <ExampleCreditCardForm />
    <pre>{{ customerProfile }}</pre>
  </section>
</template>
