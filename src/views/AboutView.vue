<script>
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  components: {
    UForm: Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      console.log(JSON.stringify(values, null, 2))
    },
    validateEmail(value) {
      if (!value)
        return 'This field is required'

      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

      if (!regex.test(value))
        return 'This field must be a valid email'

      return true
    },
  },
}
</script>

<template>
  <div id="app">
    <UForm @submit="onSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <Field name="email" type="email" :rules="validateEmail" class="form-input" />
        <ErrorMessage name="email" class="form-help error" />
      </div>

      <button>Sign up for newsletter</button>
    </UForm>
  </div>
</template>
