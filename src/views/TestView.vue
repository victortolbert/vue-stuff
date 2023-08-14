<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomInput from '~/components/CustomInput.vue'

const { values, errors, defineInputBinds, defineComponentBinds } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  }),
})

const name = defineInputBinds('name')
const email = defineComponentBinds('email', {
  mapProps: state => ({
    error: state.errors[0],
  }),
})
</script>

<template>
  <div class="form-group">
    <label for="name">Name</label>
    <input v-bind="name" class="form-input">
    <div class="form-help error">
      {{ errors.name }}
    </div>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <CustomInput v-bind="email" />
  </div>

  <pre>values: {{ values }}</pre>
  <pre>errors: {{ errors }}</pre>
</template>
