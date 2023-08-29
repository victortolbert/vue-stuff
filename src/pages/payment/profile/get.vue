<template>
  <div>
    <h1>Get Customer Payment Profile</h1>
    <p>Use this function to retrieve the details of a customer payment profile associated with an existing customer profile.</p>

    <p><b>Important:</b> If the payment profile has previously been set as the default payment profile, you can submit this request using <code>customerProfileId</code> as the only parameter. Submitting this request with only the customer profile ID will cause the information for the default payment profile to be returned if a default payment profile has been previously designated. If no payment profile has been designated as the default payment profile, failing to specify a payment profile will result in an error.</p>
  </div>
</template>
