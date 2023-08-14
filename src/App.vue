<script setup lang="ts">
import { RouterView } from 'vue-router'
import HancockTopNavbar from './components/hancock/HancockTopNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import UContainer from './components/Container.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HancockTopNavbar />

    <main class="w-full flex-1">
      <UContainer>
        <article class="mt-8">
          <RouterView />
        </article>
      </UContainer>
    </main>

    <TheFooter />
  </div>
</template>

<style>
label {
  display: block;
}
.form {
  @apply grid gap-4
}
.form-group {
  @apply grid gap-1;
}
.form-input {
  @apply block w-full rounded-md border-gray-300 bg-gray-50;
}

.dark .form-input {
  @apply border-gray-800 bg-gray-900;
}

.form-help {
  @apply text-sm text-gray-500 dark:text-gray-300;
}
.error {
  @apply text-red-500 dark:text-red-400;
}
/* input[type='text'] {}
input[type='password'] {}
input[type='email'] {}
input[type='number'] {}
input[type='url'] {}
input[type='date'] {}
input[type='datetime-local'] {}
input[type='month'] {}
input[type='week'] {}
input[type='time'] {}
input[type='search'] {}
input[type='tel'] {}
input[type='checkbox'] {}
input[type='radio'] {}
select {}
select[multiple] {}
textarea {} */
</style>
