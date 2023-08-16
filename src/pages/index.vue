<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('pages.home'),
})
</script>

<template>
  <main>
    <FormKit type="text" help="Your full name" />
    <TheWelcome />
  </main>
</template>
