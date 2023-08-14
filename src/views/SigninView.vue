<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const schema = toTypedSchema(
  z.object({
    email: z.string().min(1).email(),
    password: z.string().min(6),
  }),
)

const { errors, defineInputBinds } = useForm({
  validationSchema: schema,
})

const email = defineInputBinds('email')
const password = defineInputBinds('password')
</script>

<template>
  <div class="form-group">
    <label for="email">Email</label>
    <input v-bind="email" class="form-input">
    <div>{{ errors.email }}</div>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input v-bind="password" class="form-input">
    <div>{{ errors.password }}</div>
  </div>
</template>
