import fetch from 'node-fetch'

function getDomainNameFromURL(url) {
  const urlObj = new URL(url)
  return urlObj.hostname
}

async function fetchIPAddress(domain) {
  const resp = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
    headers: {
      accept: 'application/dns-json',
    },
  })
  const respObject = await resp.json()
  // console.log(respObject)

  // eslint-disable-next-line no-unreachable-loop
  for (const record of respObject.Answer)
    return record.data

  return null
}

const domain = 'api.boot.dev'
const ipAddress = await fetchIPAddress(domain)
if (!ipAddress)
  console.log('something went wrong in fetchIPAddress')

else
  console.log(`found IP address for domain ${domain}: ${ipAddress}`)

const bootdevURL = 'https://boot.dev/learn/learn-python'
const domainName = getDomainNameFromURL(bootdevURL)
console.log(`The domain name for ${bootdevURL} is ${domainName}`)
