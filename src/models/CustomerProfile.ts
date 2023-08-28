import type { MerchantAuthentication } from '~/types/payment'

export class CustomerProfile {
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
