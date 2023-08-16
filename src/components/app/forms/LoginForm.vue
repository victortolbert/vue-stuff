<script setup lang="ts">
import { onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'

const schema = toTypedSchema(
  yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }),
)

const { errors, defineInputBinds, handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema,
})

const name = defineInputBinds('name')
const email = defineInputBinds('email')
const password = defineInputBinds('password')

/**
 * Simulate fetching data from an API
 */
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        email: 'test@email.com',
        password: null,
      })
    }, 1500)
  })
}

// Fetch data on mounted
onMounted(async () => {
  const data = await fetchData()

  resetForm()
})

// Creates a submission handler
// It validates all fields and doesn't call your function unless all fields are valid
// You can bind `onSubmit` to a form element's submit event, or call it directly to submit the current data.

const onSubmit = handleSubmit((values, { setFieldError, resetForm }) => {
  alert(JSON.stringify(values, null, 2))

  // Set errors on Fields
  setFieldError('email', 'Incorrect credentials')
  setFieldError('password', 'Incorrect credentials')

  console.log(values) // send data to API
  // reset the form and the field values to their initial values
  resetForm()
})
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input v-bind="name" class="form-input">
      <div class="form-help error">
        {{ errors.name }}
      </div>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input v-bind="email" class="form-input">
      <div class="form-help error">
        {{ errors.email }}
      </div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input v-bind="password" class="form-input">
      <div class="form-help error">
        {{ errors.password }}
      </div>
    </div>

    <button :disabled="!meta.touched">
      Submit
    </button>
  </form>
</template>
