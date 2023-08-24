using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Exemplar.Services.AuthorizeNetService.Request
{
    public class ChargeCustomerProfileRequest

    {
        [JsonProperty("createTransactionRequest")]
        public CreateTransactionRequest createTransactionRequest { get; set; }
    }

    public class CreateTransactionRequest
    {
        [JsonProperty("merchantAuthentication")]
        public MerchantAuthentication MerchantAuthentication { get; set; }
        [JsonProperty("refId")]
        public string RefId { get; set; }
        [JsonProperty("transactionRequest")]
        public TransactionRequest TransactionRequest { get; set; }
    }

    public class TransactionRequest
    {
        [JsonProperty("transactionType")]
        public string TransactionType { get; set; }
        [JsonProperty("amount")]
        public string Amount { get; set; }
        [JsonProperty("profile")]
        public ChargeCustomerProfile Profile { get; set; }
        [JsonProperty("lineItems")]
        public LineItems LineItems { get; set; }
        [JsonProperty("processingOptions")]
        public ProcessingOptions ProcessingOptions { get; set; }
        [JsonProperty("subsequentAuthInformation")]
        public SubsequentAuthInformation SubsequentAuthInformation { get; set; }
        [JsonProperty("authorizationIndicatorType")]
        public AuthorizationIndicatorType AuthorizationIndicatorType { get; set; }
    }

    public class ChargeCustomerProfile
    {
        [JsonProperty("customerProfileId")]
        public string CustomerProfileId { get; set; }
        [JsonProperty("paymentProfile")]
        public ChargePaymentProfile PaymentProfile { get; set; }
    }

    public class ChargePaymentProfile
    {
        [JsonProperty("paymentProfileId")]
        public string PaymentProfileId { get; set; }
    }

    public class LineItems
    {
        [JsonProperty("lineItem")]
        public LineItem LineItem { get; set; }
    }

    public class LineItem
    {
        [JsonProperty("itemId")]
        public string ItemId { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("quantity")]
        public string Quantity { get; set; }
        [JsonProperty("unitPrice")]
        public string UnitPrice { get; set; }
    }

    public class ProcessingOptions
    {
        [JsonProperty("isSubsequentAuth")]
        public string IsSubsequentAuth { get; set; }
    }

    public class SubsequentAuthInformation
    {
        [JsonProperty("originalNetworkTransId")]
        public string OriginalNetworkTransId { get; set; }
        [JsonProperty("originalAuthAmount")]
        public string OriginalAuthAmount { get; set; }
        [JsonProperty("reason")]
        public string Reason { get; set; }
    }

    public class AuthorizationIndicatorType
    {
        [JsonProperty("authorizationIndicator")]
        public string AuthorizationIndicator { get; set; }
    }

}
