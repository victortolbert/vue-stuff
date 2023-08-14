<script lang="ts">
import { defineComponent } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as Yup from 'yup'

export default defineComponent({
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  data: () => ({
    schema: Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string().min(8).required(),
    }),
  }),
  methods: {
    onSubmit(values: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(JSON.stringify(values, null, 2))
        }, 2000)
      })
    },
  },
})
</script>

<template>
  <div>
    <VForm
      v-slot="{ isSubmitting }" :validation-schema="schema" class="form"
      @submit="onSubmit"
    >
      <div class="form-group">
        <label for="name">
          Name
        </label>
        <VField name="name" type="text" class="form-input" />
        <ErrorMessage class="form-help error" name="name" />
      </div>

      <div class="form-group">
        <label for="email">
          Email
        </label>
        <VField name="email" type="email" class="form-input" />
        <ErrorMessage class="form-help error" name="email" />
      </div>

      <div class="form-group">
        <label for="password">
          Password
          <VField name="password" type="password" class="form-input" />
        </label>
        <ErrorMessage class="form-help error" name="password" />
      </div>

      <button :disabled="isSubmitting" :class="{ submitting: isSubmitting }">
        Submit
      </button>
    </VForm>
  </div>
</template>
