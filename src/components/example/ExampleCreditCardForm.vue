<script>
export default {
  data() {
    return {
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardPostal: null,
      cardErrors: {},
      // declaring card-brand in data{} enables card brand name/classes.
      cardBrand: null,
    }
  },
  computed: {
    cardBrandClass() {
      return this.getBrandClass(this.cardBrand)
    },
  },
  watch: {
    // handle auto-focus to next field
    // Note: since CVC can be 3 OR 4 digits we don't watch it
    cardNumber(val) {
      if (this.$cardFormat.validateCardNumber(val))
        this.$refs.cardExpInput.focus()
    },
    cardExpiry(val) {
      if (this.$cardFormat.validateCardExpiry(val))
        this.$refs.cardCvcInput.focus()
    },
  },
  methods: {
    validate() {
      // init
      this.cardErrors = {}

      // validate card number
      if (!this.$cardFormat.validateCardNumber(this.cardNumber))
        this.cardErrors.cardNumber = 'Invalid Credit Card Number.'

      // validate card expiry
      if (!this.$cardFormat.validateCardExpiry(this.cardExpiry))
        this.cardErrors.cardExpiry = 'Invalid Expiration Date.'

      // validate card CVC
      if (!this.$cardFormat.validateCardCVC(this.cardCvc))
        this.cardErrors.cardCvc = 'Invalid CVC.'
    },
    reset() {
      this.cardErrors = {}
      this.cardNumber = null
      this.cardExpiry = null
      this.cardCvc = null
      this.cardPostal = null
      this.$refs.cardNumInput.focus()
    },
    prefill(ccNum) {
      this.cardNumber = ccNum
      this.$cardFormat.setCardType({
        currentTarget: this.$refs.cardNumInput,
        value: ccNum,
      })
    },
    getBrandClass(brand) {
      let icon = ''
      brand = brand || 'unknown'
      const cardBrandToClass = {
        visa: 'fab fa-cc-visa',
        mastercard: 'fab fa-cc-mastercard',
        amex: 'fab fa-cc-amex',
        discover: 'fab fa-cc-discover',
        diners: 'fab fa-cc-diners-club',
        jcb: 'fab fa-cc-jcb',
        unknown: 'fa fa-credit-card',
      }
      if (cardBrandToClass[brand])
        icon = cardBrandToClass[brand]

      return icon
    },
  },
  onMounted() {
    this.$refs.cardNumInput.focus()
  },
}
</script>

<template>
  <form @submit.prevent="validate">
    <div class="form-group">
      <label>Card number</label>
      <input ref="cardNumInput" v-model="cardNumber" v-cardformat:formatCardNumber :data-error="(cardErrors.cardNumber) ? true : false" class="form-control">

      <div v-if="cardErrors.cardNumber" class="error">
        <small>{{ cardErrors.cardNumber }}</small>
      </div>
    </div>

    <FormKit
      v-model="cardNumber"
      v-cardformat:formatCardNumber
      label="Card number"
      name="cardNumber"
    />

    <div class="form-group">
      <label>Card Expiry</label>
      <input v-model="cardExpiry" v-cardformat:formatCardExpiry class="form-control">
    </div>
    <div class="form-group">
      <label>Card CVC</label>
      <input v-model="cardCvc" v-cardformat:formatCardCVC class="form-control">
    </div>
    <div class="form-group">
      <label>Numeric input</label>
      <input v-model="cardNumber" v-cardformat:restrictNumeric class="form-control">
    </div>
    <button class="btn-primary btn">
      Submit
    </button>
  </form>
</template>
