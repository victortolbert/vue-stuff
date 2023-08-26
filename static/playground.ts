import fetch from 'node-fetch'

const url = 'https://apitest.authorize.net/xml/v1/request.api'
const loginId = '8d7Kz9Qt2t'
const transactionKey = '8T4YCA85hnn9rG26'

const data = {
  getCustomerProfileRequest: {
    merchantAuthentication: {
      name: loginId,
      transactionKey,
    },
    customerProfileId: '10000',
    includeIssuerInfo: 'true',
  },
}

// console.log(JSON.stringify(body, null, 2))

async function getCustomerProfile() {
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

console.log(getCustomerProfile())
