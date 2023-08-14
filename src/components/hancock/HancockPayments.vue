<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { onMounted, ref } from 'vue'
import type { PaymentProfile } from '~/types'
import { ApiClient } from '~/utilities/ApiClient'

import UContainer from '~/components/Container.vue'
import UArticle from '~/components/Article.vue'
import UFormGroup from '~/components/app/form/FormGroup.vue'
import UInput from '~/components/app/form/Input.vue'
import UTextarea from '~/components/app/form/Textarea.vue'
import UCheckbox from '~/components/app/form/Checkbox.vue'
import UButton from '~/components/app/element/Button.vue'

interface Form {
  termsAgree: boolean
  Id: number | string
  FirstName: string
  LastName: string
  Company: string
  Email?: string
  PhoneNumber: string
  invoice?: string
  claims?: string
  notes?: string
  IsProfileExist: boolean
  IsPaymentUpdated: boolean
  ExpMonth?: string[]
  ExpYear?: string[]
  PaymentProfile: PaymentProfile
}

const firstName = ref(null)

const accessToken = ref('')
const exemplarApiUrl = ref('')
const confirmMessage = ref(false)
const updateMode = ref(false)
const newEntry = ref(false)
const newCCEntry = ref(false)
const activeStep = ref('adjusterInformation')
const steps = ref([
  'adjusterInformation',
  'cardholderInformation',
  'paymentInformation',
])
const monthOptions = ref([
  'XX', '01', '02', '03', '04', '05', '06',
  '07', '08', '09', '10', '11', '12',
])

const yearOptions = ref([
  'XXXX', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030',
])

const form = ref<Form>({
  termsAgree: false,
  invoice: '',
  claims: '',
  notes: '',
  Id: 0,
  FirstName: '',
  LastName: '',
  Email: '',
  PhoneNumber: '',
  Company: '',
  IsProfileExist: false,
  IsPaymentUpdated: false,
  PaymentProfile: {
    BillTo: {
      FirstName: '',
      LastName: '',
      Company: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      PhoneNumber: '',
      FaxNumber: null,
    },
    Payment: {
      CreditCard: {
        CardNumber: '',
        ExpirationDate: '',
        ExpirationMonth: '',
        ExpirationYear: '',
        CardCode: '',
        CardType: '',
        IssuerNumber: '',
      },
    },
    DefaultPaymentProfile: false,
    CustomerProfileId: '',
    CustomerPaymentProfileId: '',
    OriginalNetworkTransId: '',
    OriginalAuthAmount: '',
  },
})

const cachedForm = ref<Form>({
  termsAgree: false,
  invoice: '',
  claims: '',
  notes: '',
  Id: 0,
  FirstName: '',
  LastName: '',
  Email: '',
  PhoneNumber: '',
  Company: '',
  IsProfileExist: false,
  IsPaymentUpdated: false,
  PaymentProfile: {
    BillTo: {
      FirstName: '',
      LastName: '',
      Company: '',
      Address: '',
      City: '',
      State: '',
      Zip: '',
      Country: '',
      PhoneNumber: '',
      FaxNumber: null,
    },
    Payment: {
      CreditCard: {
        CardNumber: '',
        ExpirationDate: '',
        ExpirationMonth: '',
        ExpirationYear: '',
        CardCode: '',
        CardType: '',
        IssuerNumber: '',
      },
    },
    DefaultPaymentProfile: false,
    CustomerProfileId: '',
    CustomerPaymentProfileId: '',
    OriginalNetworkTransId: '',
    OriginalAuthAmount: '',
  },
})

onMounted(() => {
  cachedForm.value = cloneDeep(form.value)
})

async function onSubmit() {
  try {
    const url = `${exemplarApiUrl.value}PaymentGateway/ChargeCustomerProfile`
    const { model } = await (await ApiClient.Post(url, form, accessToken.value))
    console.log(model)

    if (model.IsSuccess)
      confirmMessage.value = true

    else
      confirmMessage.value = false
  }
  catch (error) {
    console.error(error) // from creation or business logic
    confirmMessage.value = false
  }
}

function updateCardholderInformation() {
  updateMode.value = true
}

function updatePaymentInformation() {
  form.value.PaymentProfile.Payment = {
    CreditCard: {
      CardNumber: '',
      ExpirationMonth: '',
      ExpirationYear: '',
      CardCode: '',
      CardType: '',
      IssuerNumber: '',
    },
  }
  updateMode.value = true
}
function cancelBillToInfo() {
  form.value = cloneDeep(cachedForm.value)
  updateMode.value = false
}

function saveBillToInfo() {
  updateMode.value = false
  newCCEntry.value = true

  form.value.PaymentProfile.Payment = {
    CreditCard: {
      CardNumber: '',
      ExpirationMonth: '',
      ExpirationYear: '',
      CardCode: '',
      CardType: '',
      IssuerNumber: '',
    },
  }
  cachedForm.value = cloneDeep(form.value)
  form.value.IsPaymentUpdated = true
}
</script>

<template>
  <UArticle id="payment-page">
    <UContainer>
      <div v-if="confirmMessage" class="grid max-w-3xl gap-12 text-center text-lg">
        <h2 class="text-2xl text-primary-500">
          Thank you for your payment
        </h2>

        <p>
          If you do not receive a confirmation email within 2 hours of submission please call<br>
          <b>770-569-1669</b>
        </p>

        <p>
          After 7:00PM &mdash; If you have a claim for tomorrow morning, please call 770-569-1669
        </p>
      </div>

      <div v-else class="max-w-3xl">
        <h2 class="text-center text-3xl text-primary-500">
          Make a Payment
        </h2>
        <p class="mt-8 rounded bg-blue-200 p-2 text-center text-sm shadow">
          Note: For any questions regarding your account,
          please contact the billing department at 770-800-6582.
        </p>

        <ol class="grid mt-8 gap-8 whitespace-nowrap sm:grid-cols-3">
          <li class="flex items-center gap-2">
            <icon
              :icon="activeStep === 'adjusterInformation'
                ? 'tabler:square-rounded-number-1-filled'
                : 'tabler:square-rounded-number-1'
              "
              class="flex-shrink-0 text-2xl"
            />
            <button
              type="button"
              :class="{ 'font-bold': activeStep === 'adjusterInformation' }"
              @click="activeStep = 'adjusterInformation'"
            >
              Adjuster Information
            </button>
          </li>
          <li class="flex items-center gap-2">
            <icon
              :icon="activeStep === 'cardholderInformation'
                ? 'tabler:square-rounded-number-2-filled'
                : 'tabler:square-rounded-number-2'
              "
              class="flex-shrink-0 text-2xl"
            />
            <button
              type="button"
              :class="{ 'font-bold': activeStep === 'cardholderInformation' }"
              @click="activeStep = 'cardholderInformation'"
            >
              Cardholder Information
            </button>
          </li>
          <li class="flex items-center gap-2">
            <icon
              :icon="activeStep === 'paymentInformation'
                ? 'tabler:square-rounded-number-3-filled'
                : 'tabler:square-rounded-number-3'
              "
              class="flex-shrink-0 text-2xl"
            />
            <button
              type="button"
              :class="{ 'font-bold': activeStep === 'paymentInformation' }"
              @click="activeStep = 'paymentInformation'"
            >
              Payment Information
            </button>
          </li>
        </ol>

        <form class="mt-8" action="" @submit.prevent="onSubmit">
          <transition name="fade" mode="out-in">
            <fieldset v-show="activeStep === 'adjusterInformation'" key="adjusterInfo" class="grid gap-8">
              <legend class="font-semibold">
                Adjuster Information
              </legend>

              <div class="grid mt-8 gap-4">
                <UFormGroup label="Adjuster Name">
                  <UInput v-model="form.FirstName" name="adjusterName" />
                </UFormGroup>

                <UFormGroup label="Company Name">
                  <UInput v-model="form.Company" />
                </UFormGroup>

                <UFormGroup label="Email Address">
                  <UInput v-model="form.Email" />
                </UFormGroup>

                <UFormGroup label="Phone Number">
                  <UInput v-model="form.PhoneNumber" />
                </UFormGroup>

                <UFormGroup label="Invoice Number(s)" help="If paying multiple invoices, separate numbers with comma(s)">
                  <UInput v-model="form.invoice" />
                </UFormGroup>

                <UFormGroup label="Claims Number(s)" help="If paying multiple claims, separate numbers with comma(s)">
                  <UInput v-model="form.claims" />
                </UFormGroup>

                <UFormGroup label="Notes">
                  <UTextarea v-model="form.notes" />
                </UFormGroup>
              </div>

              <UButton
                block
                label="Next"
                @click="activeStep = 'cardholderInformation'"
              />
            </fieldset>
          </transition>

          <transition name="fade" mode="out-in">
            <fieldset v-show="activeStep === 'cardholderInformation'" key="cardholderInfo" class="mt-8">
              <legend class="flex items-center gap-4 font-semibold">
                <span>Cardholder Information</span>

                <button
                  v-if="!updateMode && !newEntry"
                  type="button"
                  class="text-sm font-normal text-blue-500 hover:underline" @click="updateCardholderInformation"
                >
                  Update Cardholder Information
                </button>
                <div v-if="updateMode && !newEntry" class="flex items-center gap-4">
                  <button
                    type="button"
                    class="text-sm font-normal text-blue-500 hover:underline"
                    @click="cancelBillToInfo"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="text-sm font-normal text-blue-500 hover:underline"
                    @click="saveBillToInfo"
                  >
                    Save
                  </button>
                </div>
              </legend>

              <div class="grid mt-4">
                <h4 class="block whitespace-nowrap text-sm font-medium text-gray-700">
                  Cardholder Name
                </h4>
                <div class="grid gap-4 sm:grid-cols-2">
                  <UFormGroup label="" help="First Name">
                    <UInput
                      ref="firstName"
                      v-model="form.PaymentProfile.BillTo.FirstName"
                      :disabled="!updateMode && !newEntry"
                    />
                  </UFormGroup>
                  <UFormGroup label="" help="Last Name">
                    <UInput
                      ref="firstName" v-model="form.PaymentProfile.BillTo.LastName"
                      :disabled="!updateMode && !newEntry"
                    />
                  </UFormGroup>
                </div>
              </div>

              <div class="mt-8">
                <div class="grid mt-4">
                  <h4 class="block whitespace-nowrap text-sm font-medium text-gray-700">
                    Cardholder Address
                  </h4>
                  <div class="grid gap-4">
                    <UFormGroup label="" help="Street Address">
                      <UInput
                        v-model="form.PaymentProfile.BillTo.Address"
                        :disabled="!updateMode && !newEntry"
                      />
                    </UFormGroup>

                    <div class="grid gap-4 sm:grid-cols-2">
                      <UFormGroup label="" help="City">
                        <UInput
                          v-model="form.PaymentProfile.BillTo.City"
                          :disabled="!updateMode && !newEntry"
                        />
                      </UFormGroup>
                      <UFormGroup label="" help="State">
                        <UInput
                          v-model="form.PaymentProfile.BillTo.State"
                          :disabled="!updateMode && !newEntry"
                        />
                      </UFormGroup>
                    </div>
                    <UFormGroup label="" help="Zip Code" class="max-w-xs">
                      <UInput
                        v-model="form.PaymentProfile.BillTo.Zip"
                        :disabled="!updateMode && !newEntry"
                      />
                    </UFormGroup>
                  </div>
                </div>

                <div class="grid grid-cols-2 mt-8 gap-4">
                  <UButton
                    variant="other"
                    block
                    label="Previous"
                    @click="activeStep = 'adjusterInformation'"
                  />
                  <UButton
                    block
                    label="Next"
                    @click="activeStep = 'paymentInformation'"
                  />
                </div>
              </div>
            </fieldset>
          </transition>

          <transition name="fade" mode="out-in">
            <fieldset v-show="activeStep === 'paymentInformation'" key="paymentInfo" class="mt-8">
              <legend class="flex items-center gap-4 font-semibold">
                <span>Billing and Payment Information</span>

                <button
                  v-if="(!updateMode && !newEntry) && !newCCEntry"
                  type="button"
                  class="text-sm font-normal text-blue-500 hover:underline" @click="updatePaymentInformation"
                >
                  Update Payment Information
                </button>
                <div v-if="(!updateMode && !newEntry) && !newCCEntry" class="flex items-center gap-4">
                  <button
                    type="button"
                    class="text-sm font-normal text-blue-500 hover:underline"
                    @click="cancelBillToInfo"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="text-sm font-normal text-blue-500 hover:underline"
                    @click="saveBillToInfo"
                  >
                    Save
                  </button>
                </div>
              </legend>
              <div class="mt-4 max-w-xs">
                <UFormGroup label="Payment Amount">
                  <UInput
                    v-model.number="form.PaymentProfile.OriginalAuthAmount"
                    type="number"
                    min="1"
                  />
                </UFormGroup>
              </div>

              <div class="grid mt-8">
                <h4 class="block whitespace-nowrap text-sm font-medium text-gray-700">
                  Credit Card
                </h4>
                <div class="grid gap-4">
                  <div class="mt-4 flex items-center gap-2">
                    <icon icon="formkit:amex" class="text-2xl" />
                    <icon icon="formkit:discover" class="text-2xl" />
                    <icon icon="formkit:visa" class="text-2xl" />
                    <icon icon="formkit:mastercard" class="text-2xl" />
                  </div>
                  <UFormGroup label="" help="Card Number">
                    <UInput v-model="form.PaymentProfile.Payment.CreditCard.CardNumber" :disabled="(!updateMode && !newEntry) && !newCCEntry" />
                  </UFormGroup>

                  <div class="grid grid-cols-3 gap-4">
                    <UFormGroup label="" help="Card Expiration">
                      <select
                        v-model="form.PaymentProfile.Payment.CreditCard.ExpirationMonth"
                        :disabled="(!updateMode && !newEntry) && !newCCEntry"
                        class="mt-1 block w-full border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm focus:border-primary-500 sm:text-sm focus:outline-none focus:ring-primary-500"
                      >
                        <option v-for="month in monthOptions" :key="month">
                          {{ month }}
                        </option>
                      </select>
                    </UFormGroup>

                    <UFormGroup label="">
                      <select
                        v-model="form.PaymentProfile.Payment.CreditCard.ExpirationYear"
                        :disabled="(!updateMode && !newEntry) && !newCCEntry"
                        class="mt-1 block w-full border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm focus:border-primary-500 sm:text-sm focus:outline-none focus:ring-primary-500"
                      >
                        <option v-for="year in yearOptions" :key="year">
                          {{ year }}
                        </option>
                      </select>
                    </UFormGroup>

                    <UFormGroup label="" help="CVC / CVV2 / CID">
                      <UInput v-model="form.PaymentProfile.Payment.CreditCard.CardCode" :disabled="(!updateMode && !newEntry) && !newCCEntry" />
                    </UFormGroup>
                  </div>

                  <UCheckbox
                    v-model="form.termsAgree"
                    name="termsAgree"
                    label="I agree to the terms and conditions"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 mt-8 gap-8">
                <UButton
                  variant="other"
                  block
                  label="Previous"
                  @click="activeStep = 'cardholderInformation'"
                />
                <UButton
                  type="submit"
                  block
                  label="Submit"
                />
              </div>
            </fieldset>
          </transition>
        </form>
      </div>
    </UContainer>
  </UArticle>
</template>
