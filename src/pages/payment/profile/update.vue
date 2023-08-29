<template>
  <div>
    <h1>Update Customer Payment Profile</h1>
    <p>Use this function to update a payment profile for an existing customer profile.</p>

    <p><b>Important:</b> If some fields in this request are not submitted or are submitted with a blank value, the values in the original profile are removed. As a best practice to prevent this from happening, call <code>getCustomerPaymentProfileRequest</code> to receive all current information including masked payment information. Change the field or fields that you wish to update, and then reuse all the fields you received, with updates, in a call to <code>updateCustomerPaymentProfileRequest</code>.</p>

    <p>To test the validity of new payment information, call <code>validateCustomerPaymentProfileRequest</code> after successfully updating the payment profile.</p>
  </div>
</template>
