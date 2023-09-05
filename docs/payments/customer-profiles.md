# Customer Profiles

You can use customer profiles to enable merchants to tokenize and store
sensitive customer payment information on our secure servers, which simplifies
PCI DSS compliance as well as the payments process for returning customers a
nd recurring transactions. For Customer Profile API reference information,
see the [API Reference Guide].

By providing quick access to stored customer information, Authorize.net
Customer Profiles are ideal for businesses that:

- Process recurring transactions in which the date or amount or both are
  different each month; for example, utility companies.
- Process usage charges that you bill only when the service is used;
  for example, pay-as-you-go cell phones.
- Are concerned with PCI compliance.
- Want to provide returning customers with the convenience of not having
  to re-enter personal data.

The Profiles API supports integration with a website payment form or a
proprietary business application. The profiles, which include payment
and shipping information, can then be referenced in future transactions,
eliminating steps in the transaction process for repeat customers and
potentially increasing customer loyalty.

## Resources

- [API Reference]
- [SDKs and Sample Code on GitHub]
- [Card-On-File Transactions]

## Customers

A customer profile contains minimal information about the customer such as ID,
description, and email address, but its main purpose is to link multiple
payment and shipping profiles with a single customer entity.

The following API methods are used to manage customer profiles:

- [`createCustomerProfile`]
- [`getCustomerProfile`]
- [`getCustomerProfileIds`]
- [`updateCustomerProfile`]
- [`createCustomerProfileFromTransaction`]

## Payment Profiles

Payment profiles enable merchants to securely store sensitive payment
information with Authorize.net in a secure and PCI-compliant manner.

The following API methods are used to manage customer payment profiles:

- [`createCustomerPaymentProfile`]
- [`getCustomerPaymentProfile`]
- [`updateCustomerPaymentProfile`]
- [`getCustomerPaymentProfileList`]

**Important:** If you use Apple Pay or Google Pay, do not use
[updateCustomerPaymentProfile] to update payment tokens. Use
[deleteCustomerPaymentProfile] to delete the old token, and
then use [createCustomerPaymentProfile] to create a new
payment profile with the updated token.

## Shipping Profiles

Shipping profiles enable merchants to expedite the checkout process for
repeat customers by securely storing multiple shipping addresses with
Authorize.net.

The following API methods are used to manage customer shipping profiles:

- [`createCustomerShippingAddress`]
- [`getCustomerShippingAddress`]
- [`updateCustomerShippingAddress`]

## Duplicate Profile Verification

The duplicate profile verification prevents accidental duplicate submissions.
When you submit the [createCustomerProfileRequest],
[createCustomerPaymentProfileRequest], and
[createCustomerShippingAddressRequest] API calls, the payment gateway checks
certain fields in each request to ensure that a profile with the same
information does not already exist. If the payment gateway finds a matching
profile, it returns an error message. If the duplicate profile is a customer
profile, the error message contains the ID of the existing profile.

The following table lists the fields for each API call that cannot match an
existing profile. An error occurs only when all of the values for each API
element match all of the values for each element in the existing profile.

[createCustomerProfileRequest]

- merchantCustomerId
- description
- email

[createCustomerPaymentProfileRequest]

- customerProfileId
- cardNumber
- accountNumber
- routingNumber
- billToFirstName
- billToLastName
- billToAddress
- billToZip

[createCustomerShippingAddressRequest]

- customerProfileId
- firstName
- lastName
- address
- zip
- phoneNumber

## Guest Profiles

Use the `profileType` element to create a guest profile. Guest profiles are
useful when you need to store a customer's payment information temporarily
for one-time charges.

**Important:** The guest profiles are retained for 90 days after their last
usage in a transaction request. If you create no more transactions using a
given guest profile, the guest profile is purged from the system.

### Parameter	Description

`profileType`

Indicates whether a profile is a guest profile. Either regular or guest.
The field defaults to regular.

Submitting profileType is recommended only when you need a guest profile.
If you do not need guest profiles, you do not need to send this element.

## Using the Accept Customer Hosted Form

Authorize.net Accept Customer is a fully hosted solution for payment information
capture which allows developers to leverage our Customer Profiles API while
still maintaining SAQ-A level PCI compliance. Our forms are mobile-optimized
and designed to provide a seamless consumer experience.

### Identifying the Customer

Before you can present the hosted form, you need a way of identifying returning
 customers. You can have the customer log in to your site. Several content
 management systems and shopping carts automatically support that functionality.
 It is important that the login process is reliable so that one customer does
 not have access to another's stored payment information.

For first-time customers, you must create a new profile using the
createCustomerProfileRequest method.

A customer profile contains any unique combination:

- Customer ID (any value you choose)
- Email
- Description

Once the profile is created, you will receive a unique profile ID that you
can use to identify this customer in the future.

### Retrieving a Token

Before you can send the HTML form post, you must retrieve a token using the
getHostedProfilePageRequest method.

You must include the customer's profile ID in your request.

See the section Guidelines for Parameter Settings for more information on
configuring parameter settings for the hosted form.

### Presenting the Hosted Form

The token is passed in a basic HTML form with the input name token. The input
name token is the only input value that must be included for a request to add
a new payment or shipping profile, or to manage all of your profiles in one
window. To prompt the customer to edit only a single existing profile, you must
include the associated profile ID in an additional paymentProfileId or
shippingAddressId form POST field.

The type of form that you display is determined by the URL to which the form
is submitted, also known as the form action, shown below:

### Form Action URLs

- Manage Profiles: https://accept.authorize.net/customer/manage
- Add Payment Profile: https://accept.authorize.net/customer/addPayment
- Add Shipping Profile: https://accept.authorize.net/customer/addShipping
- Edit Payment Profile: https://accept.authorize.net/customer/editPayment
- Edit Shipping Profile: https://accept.authorize.net/customer/editShipping

### Conditional Fields

- To edit the payment profile, include a form field called paymentProfileId
  containing the ID of the payment profile that you want the customer to edit.
- To edit the shipping address, include a form field called shippingAddressId
  containing the ID of the shipping address profile that you want the customer
  to edit.

For reference, here is a sample HTML form:

```html
<form method="post" action="https://accept.authorize.net/customer/editPayment">
  <input type="hidden" name="token" value="HOSTED_PAGE_TOKEN"/>
  <input type="hidden" name="paymentProfileId" value="PROFILE_ID_TO_EDIT"/>
  ...
</form>
```

### Sandbox

To test in Sandbox replace test.authorize.net with accept.authorize.net in the
form URL. For example:

- https://test.authorize.net/customer/manage

### Displaying the Form

The hosted form is designed so that you can integrate it into your site in
almost any way. You can configure it as a separate pop-up window or embed
it into your existing site. You can use a lightbox layout, in which the box
pops up in front of the rest of your site, but not in a new window. Or,
you can use the full window by directing the customer to Authorize.net and
letting them direct themselves back again, which avoids the use of JavaScript.

Our sample application on GitHub shows examples of how to present the form in
different modes, including examples of how to open the hosted form in a
lightbox. The lightbox layout can also be accomplished with third-party
JavaScript toolkits such as jQuery.

### Redirect

To use a redirect to Authorize.net, follow these steps:

**Step 1:** When you receive the token returned by the
GetHostedProfilePageResponse function call, put a hidden form somewhere on your
page (the value for the token will be the value returned by the function call).

If you are using the test environment, replace
https://accept.authorize.net/customer/manage with
https://test.authorize.net/customer/manage.

For reference, here is a sample HTML form:

```html
<form method="post" action="https://accept.authorize.net/customer/manage">
  <input type="hidden" name="token" value="pfGaUNntEKMGfyWPmI4p+Bb4TJf2F0NCoCBp3cOXB7"/>
  <input type="submit" value="Manage my payment and shipping information"/>
</form>
```

Step 2: Add a button on your page that redirects the customer to the
Authorize.net secure site. You can customize the text within your page's HTML:

```html
<input type="button" onclick="document.getElementById('formAuthorizeNetPage').submit();">
  Manage my payment and shipping information</input>
```

In this example, the "Manage my payment and shipping information" button directs
users to the Authorize.net Accept Customer hosted page, where they can:

- Create a new payment profile
- Update or delete current credit card or bank information
- Enter a new shipping address
- Update or delete current shipping address

### Iframe/Lightbox

For security reasons, web browsers do not allow JavaScript communication from
a page inside an iFrame to the page that contains the iframe if those pages are
hosted on different domains. Therefore, our hosted form cannot directly provide
information to the page that is encapsulating it.

However, it is beneficial to provide some small amount of information
indirectly through a third page. When making the token request, you can pass
us the URL for an iFrameCommunicator page. This iFrameCommunicator page is
a small HTML page, hosted on your domain, that contains a JavaScript that
listens for events. When you embed our hosted form in an iframe on your page,
our hosted form can in turn embed your iFrameCommunicator page within it inside
an invisible iframe. This enables a channel of communication that allows us to
send messages to your iFrameCommunicator page. Then, as long as your
iFrameCommunicator page is hosted on the same domain as your main page,
it can communicate back to your main page.

This channel of communication is used to pass a few basic messages back to a
listener script running on your main page (the page that calls the form):

- Ideal height and width of the window: allows you to resize the frame and avoid
  any scrollbars from appearing.
- Changes Saved: returned whenever the customer saves changes to their profile.
  You can use this notification to know when to look for those changes through
  the Customer Profiles API.
- Request Cancelled: returned when the customer leaves the hosted form.

**Important:** If you plan to host our form in an iFrame, you must include the
address to your iFrameCommunicator page in the
`hostedPaymentIFrameCommunicatorUrl` parameter in the
`getHostedProfilePageRequest` call.

**Important:** You must use HTTPS in the URL to your iFrameCommunicator page.

For an example of an iFrameCommunicator page and more information about the
messages passed, see our sample [IFrameCommunicator.html] in our sample
application on GitHub.

### Guidelines for Parameter Settings

The following parameter settings are used with the `getHostedProfilePageRequest`
call.

To integrate to the hosted page as a redirect, pass the hostedProfileReturnUrl
parameter and the hostedProfileReturnUrlText parameter. The parameter
hostedProfilePageBorderVisible=true is optional.

To integrate to the hosted page as a popup, pass the
hostedProfilePageBorderVisible=false parameter and the
hostedProfileIFrameCommunicatorUrl parameter.

**Important:** The following parameter settings include options for marking
form fields as required. However, the fields marked as required are not
automatically required by Authorize.net.

To require fields on the hosted form:

1. Log in to the Merchant Interface at https://login.authorize.net/ as an
   Account Administrator.
2. Choose Account > Payment Form > Form Fields.
3. Check Required for each field that you wish to require, or uncheck to
   disable the requirement.
4. Click Submit.

The following table shows possible settings:

#### Parameter Description

#### `hostedProfileSaveButtonText`

The text for the button that the customer clicks to confirm changes and save
the profile. Up to 20 characters. The field defaults to Save.

Applies to the addPayment, editPayment, addShipping, and editShipping forms.

#### hostedProfileReturnUrl

The URL for the page that the customer returns to when the hosted session ends.
Used when redirecting to the form. Do not pass this setting for iframes or
popups.

The URL must begin with http or https.

#### hostedProfileReturnUrlText

The text for the button that returns the customer to your website when finished.
Up to 200 characters. Used when redirecting to the form. The field defaults to
Continue. Do not pass this setting for iFrames or popups.

#### hostedProfilePageBorderVisible

Boolean (true OR false). Removes the border and associated logo from the
payment form. Must be set to false for iFrames or popups. Optional for
redirects.

#### hostedProfileHeadingBgColor

An RGB hex color code, such as #E0E0E0. Changes the accent color of the form's
field lines, buttons, and other HTML elements.

#### hostedProfileIFrameCommunicatorUrl

The URL to a communicator page that sends details to the merchant's site
through JavaScript.

Required only for iFrame or lightbox applications.

#### hostedProfilePaymentOptions

Specifies which payment options to show. The field defaults to showAll.

To display only credit card fields, use showCreditCard. To display only bank
account fields, use showBankAccount. To display both payment options, use
showAll.

Applies to Accept Customer pages where the customer may add payment information.

#### hostedProfileValidationMode

Specifies how the payment gateway will validate the customer's card prior
to creating the profile. Either liveMode or testMode. The field defaults to
liveMode.

liveMode generates a transaction to the processor in the amount of 0.01 or 0.00.
If successful, the transaction is immediately voided. Visa authorizations in
liveMode use 0.00 for all processors. All other credit card types use 0.01.

Standard gateway and merchant account fees may apply to the authorization
transactions. For Visa transactions using 0.00, the billTo address and billTo
postal code fields are required.

testMode performs field validation only. All fields are validated. However,
fields with unrestricted field definitions, such as telephone number, do not
generate errors.

If you set this parameter to testMode, a 1.00 test transaction is submitted
using the Luhn mod 10 algorithm to verify that the credit card number is in a
valid format. This test transaction is not authorized at the processor, and
does not appear on the customer's card statement, but it will generate and send
a transaction receipt email to the merchant.

If a validation transaction is unsuccessful, the profile creation attempt
fails, and the merchant receives an error.

**Important:** liveMode requires a billing address. If you do not want to
collect a billing address, you must use testMode.

#### hostedProfileBillingAddressRequired

Boolean (true OR false). The field defaults to false.

When this parameter is set to true, the hosted form marks the billing address
fields as required, with an asterisk. These fields must be completed in order
to create or update a payment profile within the hosted customer profile form.

#### hostedProfileCardCodeRequired

Boolean (true OR false). The field defaults to false.

When this parameter is set to true, the hosted form marks the Card Code field
as required, with an asterisk. The Card Code field must be filled in order to
create or update a payment profile within the hosted customer profile form.

#### hostedProfileBillingAddressOptions

Either showBillingAddress or showNone. The field defaults to
showBillingAddress.

Applies to Add/Edit Payment Pages. When this paramter is set to
showBillingAddress, the form displays all billing address fields,
including name fields. When this parameter is set to showNone,
the hosted form only displays payment method fields.

Important: When hostedProfileValidationMode is set to liveMode, you must set
hostedProfileBillingAddressOptions to showBillingAddress. Any other value will
generate an error. If you do not wish to collect a billing address, you must
set hostedProfileValidationMode to testMode.

#### hostedProfileManageOptions

Either showAll, showPayment, or showShipping. The field defaults to showAll.

Applies to Manage pages. When set to showAll, both Payment and Shipping sections
are shown. When set to showPayment, only the Manage Payment section is shown.
When set to showShipping, only the Manage Shipping section is shown.

## Charging Customer Profiles

You can use `profile` information in the profile element of a
[createTransactionRequest] API call.

**Important:** If you do not send the appropriate card-on-file fields for charge
transactions using Apple Pay or Google Pay, you will see error E00142,
"RecurringBilling setting is a required field for recurring tokenized payment
transactions". For merchant-initiated recurring tokenized payment transactions,
set the recurringBilling field. For merchant-initiated unscheduled or industry
practice tokenized payment transactions on the FDC Nashville and NAB-EPX
processors, set processingOptions.isSubsequentAuth. For customer-initiated
tokenized payment transactions on the FDC Nashville and NAB EPX processors,
set processingOptions.isStoredCredentials.

### Refunds

If you submit a refund against a previous customer profile transaction, we
recommend that you:

- Include `customerProfileId`, `customerPaymentProfileId`, and `transId`.
  `customerShippingAddressId` is optional.
- `creditCardNumberMasked`, `bankRoutingNumberMasked`, and
  `bankAccountNumberMasked` do not need to be included, but they are validated
  if they are included.

You may also issue a refund for a transaction, whether generated by a customer
profile or as a standalone transaction. For such refunds please bear in mind
the following:

- You must include `transId` and either the `creditCardNumberMasked`, or
  `bankRoutingNumberMasked` and `bankAccountNumberMasked`.
- Do not include `customerProfileId`, `customerPaymentProfileId`, or
  `customerShippingAddressId`.

**Important:** A refund transaction will not appear in the history of the
payment profile unless you generate the refund with the payment profile.

## Using the Account Updater Service

The Authorize.net Account Updater service automatically verifies and updates
credit card information in customer profiles. This feature increases
authorization approvals, helping drive more sales and retain customers
by reducing risk of service cancellation.

You can run reports on Account Updater using the following API calls:

- [getAUJobSummaryRequest] retrieves a summary of an Account Updater job,
  in a given month.
- [getAUJobDetailsRequest] retrieves the details of all updates in a given
  month.
