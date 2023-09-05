Payment Transactions
The Authorize.net API provides robust features for processing payment transactions through the Authorize.net gateway. The API supports XML and JSON variants.

For detailed API reference information, see the API Reference.

If you are new to the Authorize.net API, start with the Credit Card Payment Tutorial. Many of the core concepts in the tutorial apply to other payment types, which makes it a good place to start. You should also sign up for a sandbox account and use the Testing Guide for your initial tests.

If you design solutions used by multiple merchants, consider registering as a partner and generating a solution ID. By using solution IDs, your solution identifies itself in your merchants' transactions when they review their reports.

When you develop your payment application and integrate it with the Authorize.net API, you must consider the Payment Card Industry Data Security Standards (PCI-DSS). For more information, see the Understanding PCI Compliance page.

While payment cards remain the primary method of payment, the Authorize.net API supports several alternate payment types, such as PayPal and Apple Pay. For more information on payment types and API features supported by Authorize.net, see the API Documentation landing page.

For information on specific payment processing platforms and the features they support through the Authorize.net payment gateway, see the Processor Support documentation.

Resources

API Reference
Card-On-File (COF) Mandates
Purchase Return Authorization (PRA) Mandate
Processor Support
SDKs and Sample Code on GitHub
Looking for AIM/SIM

Basics of Credit Card Processing

Connecting a website or software application to payment processing networks is exceptionally difficult and typically beyond the expertise and technical resources of most merchants. Instead, merchants can connect to the Authorize.net Payment Gateway, which provides the complex infrastructure and security necessary to ensure fast, reliable, and secure transmission of transaction data.

Typically, four actors participate in a payment card transaction.

A merchant sells products or services to customers, and can use the Authorize.net Payment Gateway and its API to submit payment transactions.
A customer buys products or services from merchants using a payment card from an issuing bank.
An issuing bank provides payment cards to customers and represent customers in disputes.
An acquiring bank underwrites merchants so the merchants can accept payment cards. Acquiring banks also represent merchants in disputes.
Stages of a Transaction
An online payment transaction goes through three stages.

Authorization

An authorization is a hold on the transaction amount against the available balance on a customer's payment card. No funds are transferred while the funds for the transaction are on hold. For example, a merchant who sells products first authorizes the amount of the transaction and then ships the order to the customer. Only after the merchant ships the order does the merchant take the next steps.

Capture
A capture queues a transaction for settlement. Usually merchants capture the full amount of the original authorization, but the capture amount can be less. A single authorization can be captured only once. If you capture only part of an authorization amount, a new authorization will be required in order to capture more. For example, suppose that the merchant does not have the full order in stock. The merchant can ship a partial order and then capture the transaction for an adjusted amount.

Important: Authorize.net defaults to automatically capturing authorized amounts. See Transaction Types below for more information.

Settlement
Settlement is the process through which merchants instruct the acquiring bank to acquire the captured funds from the issuing bank. When the merchant captures the transaction, Authorize.net settles the transaction within 24 hours. After settlement completes, the acquiring bank deposits the captured funds into the merchant’s bank account.

Transaction Types
Authorize.net supports several transaction types for creating and managing transactions through the createTransactionRequest API call.

Authorization and Capture
The transaction amount is sent for authorization and if it is approved, the transaction is automatically submitted for settlement. This transaction is the most common type of transaction and is the default when merchants manually enter transactions in the Merchant Interface.

To submit an Authorization and Capture request, set the transactionType element to authCaptureTransaction in the createTransactionRequest API call.

Authorization Only
The transaction amount is sent for authorization only. The transaction is not settled until captured by Prior Authorization Capture (see definition below), or the merchant manually captures the transaction in the Merchant Interface. Authorization Only transactions that are not captured within 30 days of authorization are expired and are no longer available for settlement. Merchants with an expired transaction should authorize and capture a new transaction to receive funds.

To submit an Authorization Only request, set the transactionType element to authOnlyTransaction in the createTransactionRequest API call.

Prior Authorization Capture
The previously authorized transaction is captured and queued for settlement. Authorize.net accepts this transaction type if:

The original Authorization Only transaction was submitted within the past 30 days and has not expired.
The Authorization Only transaction was successful and is not yet captured.
The amount being requested for capture is less than or equal to the original authorized amount. Only one Prior Authorization Capture request can be submitted against an Authorization Only transaction.
The Prior Authorization Capture request is submitted with the valid transaction ID of an Authorization Only transaction.
To submit a Prior Authorization Capture request, set the transactionType element to priorAuthCaptureTransaction in the createTransactionRequest API call.

In addition, specify the transaction ID of the original Authorize Only transaction in the refTransId element.

For the Prior Authorization Capture transaction type, the amount element is required only if capturing less than the amount of the original Authorization Only transaction. If no amount is submitted, Authorize.net settles the transaction for the original authorization amount.

Capture Only
The transaction uses an authorization code that was not obtained through the payment gateway, such as an authorization code obtained through a voice authorization center.

To submit a Prior Authorization Capture request, set the transactionType element to captureOnlyTransaction in the createTransactionRequest API call.

In addition, specify the authorization code in the authCode element.

Void
The transaction specified in the refTransId element is canceled before settlement. Once a transaction settles, it cannot be voided. Funds on a voided transaction can be held briefly by the issuing bank, depending on the issuing bank's policy, and then returned to the customer's available balance.

To submit a Void request, set the transactionType element to voidTransaction in the createTransactionRequest API call.

In addition, specify the transaction that you wish to void by passing the transaction ID in the refTransId element.

Credit
The transaction specified in the refTransId element is refunded after settlement. A credit is a new and distinct transaction from the original charge with its own unique transaction ID. Merchants can submit credits against settled transactions in amounts up to the original capture amount. By default, the merchant can refund a settled transaction within 180 days of settlement.

Important: You may issue credits with the amount element set to any amount up to the originally settled amount. For example, merchants can issue partial credits if they are unable to fulfill the complete order prior to settlement.

To submit a Credit request, set the transactionType element to refundTransaction in the createTransactionRequest API call.

In addition, specify the transaction that you wish to refund by passing the transaction ID in the refTransId element.

Important: Some refund transactions processed by FDC Nashville merchants may be subject to the Purchase Return Authorization (PRA) Mandate.

Transaction Settings
All createTransactionRequest calls support optional per-transaction settings, such as email receipt delivery, split tender, or duplication checks. You submit these per-transaction settings through the transactionSettings element, using pairs of settingName and settingValue child elements. The valid values for settingName and their usages are listed below.

settingName Value	Description	settingValue Format
emailCustomer	Flags whether to send the customer email receipt.	Boolean.
headerEmailReceipt	Text for header of customer email receipt.	String. HTML not supported.
footerEmailReceipt	Text for footer of customer email receipt.	String. HTML not supported.
allowPartialAuth	Flags whether to allow partial authorization on this transaction request as part of a split tender sale.	Boolean.
duplicateWindow	Time in seconds to check for subsequent duplicate requests of this transaction. Use to help prevent accidental double-billing.	String. Maximum value = 28800 (8 hours).
recurringBilling
Recurring payment indicator.

Use only if your software generated the recurring payments. Your Merchant Service Provider might require you to submit recurringBilling for software-generated recurring payments.

Setting recurringBilling to TRUE does not create subscriptions in your account's recurring billing setup. See the Recurring Billing section of the API Reference for details on how to create a subscription for recurring payments.

Boolean.
Retail Transactions
Authorize.net supports retail transactions, which vary from e-commerce transactions as follows.

Retail transactions rely on track data obtained from either the card's EMV chip or from the magnetic stripe on the back of the card. While it is possible to submit a retail transaction using the card number and expiration date, merchant banks typically require track data for favorable retail rates.
A market type and device type indicate that the transaction is a retail transaction submitted through a device permitted by the merchant bank. For example, the merchant bank might approve the merchant for payments made through a kiosk, but not through an electronic cash register.
Retail transactions support partial authorizations for split-tender orders.
Market Type and Device Type
For retail transactions submitted with track data, you must set the marketType element to 2 and also submit the deviceType element.

Available values for deviceType are listed below.

deviceType Value	Description
1	Unknown device type
2	Unattended terminal
3	Self-service terminal
4	Electronic cash register
5	PC-based terminal
7	Wireless POS terminal
8	Website
9	Dial terminal
1	Virtual Terminal
Partial Authorization
Partial authorization transactions allow split-tender orders so that a customer can pay for one order with more than one payment card.

In the request, set allowPartialAuth to true to indicate that the merchant's system can process partial authorizations. Without allowPartialAuth, the transaction will be either authorized for the full amount, or declined due to lack of funds on the card.

If the first transaction is successfully approved for a partial amount of the total order, a split-tender ID is generated and returned to the merchant in the response. This ID must be passed back with each of the remaining transactions of the group, using the splitTenderId element.

Important: If you include both a split-tender ID and a transaction ID on the same request, an error results.

All transactions grouped under a split-tender ID are not captured until the final transaction of the group is successfully authorized.

If the merchant needs to capture the group of transactions before the final transaction is approved—if the balance is paid by cash, for example—send an updateSplitTenderGroupRequest request and include the split-tender ID instead of a transaction ID. In this case, you would also submit the splitTenderStatus element with a value of completed.

If the merchant needs to void the group before completion, send a void request using the split-tender ID instead of a transaction ID.

The transactions in a group are not captured for settlement until either the merchant submits payments adding up to the full requested amount or until the merchant indicates that the payment is complete by submitting the splitTenderStatus element with a value of completed.

Unique elements that apply to partial authorization transactions are:

Element Name	API Call	Description
allowPartialAuth	createTransactionRequest	(Optional) Indicates whether to permit partial authorization for this transaction. This value overrides the Merchant Interface setting, which is disabled by default.
balanceOnCard	createTransactionResponse	The available balance remaining on the card.
requestedAmount	createTransactionResponse	The originally requested amount of the order.
splitTenderId	createTransactionResponse	The split-tender ID provided in the response received for the first partial authorization. Use this ID when submitting subsequent transactions related to the same order.
splitTenderStatus	createTransactionResponse	The status of the split-tender order as a whole. Possible values are: completed, held, or voided.
Testing Partial Authorization in the Sandbox Environment
See the Generating Card Responses section of the Testing Guide for details on how to simulate partial authorization scenarios in the sandbox.

Basic Fraud Settings
AVS

The Address Verification Service (AVS) is a system provided by issuing banks and card associations to help identify suspicious payment card activity for e-commerce transactions. AVS matches portions of the customer's billing address, as provided by the merchant, against the billing address on file with the issuing bank. The issuing bank, through the merchant's processing network, sends AVS data indicating the results to Authorize.net, which stores and uses the single-letter AVS response code for display and optional filtering. The AVS response code can be found in the createTransactionResponseAPI call. Based on the merchant's AVS rejection settings, the transaction is accepted or rejected.

Rejected transactions display a transaction status of "Declined (AVS Mismatch)" on the Transaction Detail page in the Merchant Interface, and receive a Response Reason Code of 27. The merchant cannot retrieve address information from the issuing bank; the bank provides only a response indicating whether the street address's house number and postal code match. Due to potential misspellings and alternate address format conventions, issuing banks typically ignore text portions of the billing address during AVS checks.

To implement AVS, the merchant must require the Address and ZIP fields on their payment form. To manage AVS rejection settings, log in to the Merchant Interface and choose Account > Settings > Security Settings > Basic Fraud Settings > AVS.

Card Code Verification (CCV)
This feature compares the card code submitted by the customer with the card code on file with the issuing bank. Filter settings in the Merchant Interface allow the merchant to reject transactions based on the CCV response received. To implement CCV, the merchant must require the "Card Code" field on their payment form.

To manage rejection settings, log in to the Merchant Interface and choose Account > Settings > Security Settings > Basic Fraud Settings > CCV.

Visa refers to the card code as a Card Verification Value 2 (CVV2); Mastercard uses Card Validation Code 2 (CVC2); and Discover and American Express use Card Identification Number (CID).

For security reasons, Authorize.net does not store the card code data. If you configure a fraud or velocity rule in the Advanced Fraud Detection Suite with the action, "Do not authorize, but hold for review," the card code of the transactions flagged by this rule cannot be validated when you approve the transaction later. Authorize.net recommends that merchants who wish to validate CCV use the action, "Authorize and hold for review," instead of "Do not authorize, but hold for review."

Daily Velocity Filter
The Daily Velocity Filter enables merchants to specify a threshold for the number of transactions allowed per day. All transactions exceeding the threshold for that day are flagged and processed according to the selected filter action. This filter is helpful in preventing certain types of fraudulent activity on the merchant's account.

To configure the Daily Velocity Filter, log in to the Merchant Interface and choose Account > Settings > Security Settings > Basic Fraud Settings > Daily Velocity.

Retrieving, Approving, and Declining Held Transactions
The Authorize.net Merchant Interface provides access to the Advanced Fraud Detection Suite (AFDS) for merchants who sign up. The Authorize.net API implements some AFDS functions for retrieving, approving, or declining suspicious transactions that are being held for review. To see the reference information for those requests, see the Fraud Management section of the API Reference.

Compliance
The Payment Card Industry Data Security Standard (PCI DSS) is a set of requirements designed to ensure that all companies that process, store, or transmit payment card information maintain a secure environment. By following PCI DSS, you assure your merchants that they have a solid foundation for accepting secure payments. For more information, see the PCI Security Standards page and the Authorize.net blog post on understanding PCI compliance.

The following video explains more about payment industry security standards.
