https://developer.authorize.net/api/reference/features/card-on-file.html

# Card-On-File Transactions

The Authorize.net API supports card-on-file (COF) transaction processing for merchants who use the FDC Nashville and NAB EPX processors to accept Visa, Mastercard, Discover, Diners Club, JCB, and China Union Pay transactions using stored credentials. Support for COF transactions enables merchants and issuers to better understand their transaction risk. In addition, merchants might see increased authorization approval rates for their COF transactions.

This guide is applicable to merchants storing card-on-file payment information. Recurring Billing users do not need to update their systems as Authorize.Net handles COF for recurring billing transactions automatically.

Important: Use the appropriate fields and settings for your merchant's use case. Inappropriate or erroneous usage of COF fields can result in downgrades or transaction declines. The details in this Developer Guide outline the best practices for successful transaction processing.

## Resources

- API Reference
- Transaction Processing
- Processor Support

## Establishment of Relationship

Important: The customer must consent to the storage of payment details for future use when submitting the first transaction.

Set the isFirstSubsequentAuth field to true in the first transaction request if there are no planned scheduled payments to follow. The first transaction must be identified as a COF transaction whether it is a zero-dollar authorization or the first non-zero charge. If you use customer profiles, and if you previously set the validateMode field to live, do not set isFirstSubsequentAuth to true as the validation counts as the first transaction. However, if you use customer profiles, and if you previously set the validateMode field to test, set isFirstSubsequentAuth to true.

For the first charge request in a series of recurring payments, under the processingOptions element, set the isFirstRecurringPayment field to true.

## Customer-Initiated Transactions (CITs)

Set the isStoredCredentials field to true if the transaction was initiated by a customer using the merchant's stored COF data.

## Merchant-Initiated Transactions (MITs)

When a merchant uses a card on file for transaction processing, the merchant must indicate which transactions were initiated by the merchant. MIT processing rules do not apply to transactions that use personal account numbers (PANs) outside of the European Economic Area (EEA), but compliance is recommended as these processing rules may be required at a later time.

Merchants receive network transaction IDs in API responses for all transactions regardless of whether the card is stored on file. For payment information stored prior to the COF mandates, use the first network transaction ID received for a given stored credential as the original network transaction ID.

### Industry Practice MITs

For all industry practice MITs:

Under the processingOptions element, set the isSubsequentAuth field to true.
Under the subsequentAuthInformation element:

- Set reason to reflect one of the uses cases listed below.

- Set originalAuthAmount to the original amount for the first transaction that establishes a relationship with the customer. See the Establishment of Relationship section for details on establishing the relationship. If you are using customer profiles, do not set originalAuthAmount as this value is stored and automatically sent with your request.

Important: Required for Discover, Diners Club, JCB, and China Union Pay transactions only.

- If you are not using customer profiles, set originalNetworkTransId to the value of networkTransId from the transaction that establishes a relationship with the customer. Customer profiles automatically send the original network transaction ID from the first transaction submitted for the payment profile. See the Establishment of Relationship section for details on establishing the relationship.

For samples of API calls for processing MIT transactions, see the API Reference.

### Resubmission

If the follow-on MIT transaction is due to a decline, and when the products or services have been provided to the customer:

Under the subsequentAuthInformation element, set reason to resubmission.

### Reauthorization

If the original authorization expires before products or services are provided by the merchant, for example, when the original authorization for an extended-stay hotel, cruise line, or vehicle rental company expires before the rental is complete:

Under the subsequentAuthInformation element, set reason to reauthorization.

### Delayed Charge

For supplemental charges after the initial transaction, for example, when a hotel, cruise line, or vehicle rental company needs to charge service fees or penalties:

Under the subsequentAuthInformation element, set reason to delayedcharge.

### No Show

For penalties incurred when a customer fails to arrive for a guaranteed reservation:

Under the subsequentAuthInformation element, set reason to noshow.

### Standing Instruction MITs

A standing instruction MIT is a transaction for follow-on charges for products or services provided to the customer. Merchants typically state follow-on charges in the agreement with the customer.

### Recurring Payments

Recurring payments are a series of transactions using the same payment information and charged at regular intervals. To process recurring payments, the merchant must obtain authorization from the customer to initiate future transactions. See the Establishment of Relationship section for details on obtaining the authorization. Recurring Billing users do not need to update their systems as Authorize.Net handles COF for recurring billing transactions automatically.

Follow the instructions below for recurring payments:

- Under the settings element under transactionSettings, set the settingName field to recurringBilling, and set the settingValue field to true.
- Under the subsequentAuthInformation element:
  - Set originalNetworkTransId to the value of networkTransId from the transaction that establishes a relationship with the customer. See the Establishment of Relationship section for details on establishing the relationship. Users of customer profiles do not need to set this field since Authorize.Net handles the network transaction ID automatically.

- Set originalAuthAmount to the original amount for the transaction that establishes a relationship with the customer. See the Establishment of Relationship section for details on establishing the relationship.

Important: Required for Discover, Diners Club, JCB, and China Union Pay transactions only.

### Unscheduled COF Payment

Unscheduled payments are transactions that use the same payment information but are not charged at regular intervals. To process unscheduled payments, the merchant must obtain authorization from the customer to initiate future transactions. For example, a customer might authorize unscheduled payments for an on-demand service with a time limit. See the Establishment of Relationship section for details on obtaining an authorization from the customer.

Follow the instructions below for an unscheduled payment:

- Under the processingOptions element, set the isSubsequentAuth field to true.
- Under the subsequentAuthInformation element:
  - Set originalNetworkTransId to the value of networkTransId from the transaction that establishes a relationship with the customer. See the Establishment of Relationship section for details on establishing the relationship. Users of customer profiles do not need to set this field since Authorize.Net handles the network transaction ID automatically.
  - Set originalAuthAmount to the original amount for the transaction that establishes a relationship with the customer. See the Establishment of Relationship section for details on establishing the relationship.

Important: Required for Discover, Diners Club, JCB, and China Union Pay transactions only.

## Identifying COF Transactions

Use the getTransactionDetailsRequestAPI call to obtain the originalNetworkTransId and originalAuthAmount from any of the transactions authorized for a given set of stored credentials. You can also use originalNetworkTransId to match the original transaction's networkTransId.

## Card Brand Requirements

These requirements apply to all createTransactionRequest API calls, including those using customer profiles.

### Visa Network Transaction IDs

Merchants should use a network transaction ID from the original CIT transaction. If it is not possible to obtain customer approval for the original transaction, the merchant can use a network transaction ID from a previous approved transaction and use that for subsequent transactions.

For Visa transactions, a network transaction ID must be included for the following MIT use cases:

- Resubmission
- Delayed charge
- Reauthorization
- No show
- Recurring payments
- Unscheduled payments

### Discover Network Reference IDs (NRIDs)

The original transaction amount and the NRID of the first transaction must be included in all MIT use cases.

To ensure that merchants can process Discover, Diners Club, JCB, and China Union Pay transactions in the MIT framework, Discover provides a temporary NRID for MIT transactions. Set the originalNetworkTransId field to 918273641064738 if you do not have the actual NRID. A new NRID is returned in the networkTransId field, which should be used for subsequent MIT transactions. The temporary NRID is valid through November 1, 2021.

### Mastercard Network Transaction IDs (Trace IDs)

Mastercard trace IDs are required only for transactions in the European Economic Area (EEA), but are recommended for all transactions because Mastercard could change their requirements later.

## Further Considerations

- Include all COF fields with your customer profile transaction request. The exception is for originalNetworkTransId and originalAuthAmount, which is stored with the customer payment profile and passed to the processor by default. Failure to include all COF fields will cause you to be out of compliance with the COF mandate.
- If you use customer profiles and you already have a network transaction ID and original amount that your business prefers to use, especially if a third-party system generated these values, you may use originalNetworkTransId and originalAuthAmount to submit these values. Authorize.Net does not validate these values, so make sure that the values are correct.
- If you create a payment profile and the first transaction is declined by the card issuer, fails to settle, or is declined after being held by fraud filters, delete the payment profile and create a new payment profile with updated payment card information.
- Authorize.Net uses a logic to determine the best values to send to the processor in case conflicting values are sent with a transaction request. For example, if you set isSubsequentAuth to true and isStoredCredentials to true, Authorize.Net will determine which value is correct based on the state of the profile, and send the correct value to the processor.
- The first transaction for a payment profile is used for subsequent transactions, regardless of whether it is a one-time industry practice charge or a recurring series.
- If a cardholder provides a new card for a set of payments that is already in progress, the first transaction using its payment profile is the new original transaction, and its network transaction ID and original authorization amount should be used for subsequent transactions.
- Changes to a customer profile's billing address have no effect on COF transactions, and the payment profile's network transaction ID and original authorization amount is used as normal.
- Transactions generated through the Merchant Interface using the Customer Profiles feature is handled as CIT transactions. Transactions generated using the Virtual Terminal is not handled as CIT or MIT transactions.
- If you use the Account Updater service and the service updates the payment card information on a payment profile, the first transaction using the updated payment card generates a new network transaction ID, which is used as the originalNetworkTransId for subsequent transactions.
