Purchase Return Authorizations (PRAs)
The PRA mandate requires that refund transactions be authorized in the same way that charge transactions are authorized. Merchants on the FDC Nashville processor have support for the PRA mandate for Visa and Discover refunds. Merchants on the TSYS processor have support for the PRA mandate for Visa, American Express, and Discover.

Resources

API Reference
Processor Support
SDKs and Sample Code on GitHub
Looking for AIM/SIM
Mandate Changes
The mandate requires the following changes to refunds:

Refunds now have authorization codes returned in the API response. See the Refund a Transaction section of the API Reference for documentation and samples.
Refunds may be declined by the card issuing bank. Contact your Merchant Service Provider for best practices for declined refunds.
Customers will see pending refunds on their card statements if their card issuer supports the PRA mandate.
There are no changes to merchant account configuration for the PRA mandate, and no further action needs to be taken.

Support for the PRA mandate is not available for Mastercard because Mastercard does not currently require support for the mandate.

Support for processors other than FDC Nashville and TSYS might be announced at a later time. Check this page for updates.
