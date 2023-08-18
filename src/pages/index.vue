<script setup lang="ts">
const { t } = useI18n()

const title = ref('')

title.value = t('pages.home')

useHead({
  title: () => title.value,
})
</script>

<template>
  <section>
    <ExampleCreditCardForm />
  </section>
</template>
