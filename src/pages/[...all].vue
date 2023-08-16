<script setup lang="ts">
import RandomImage from '~/components/RandomImage.vue'

const { t } = useI18n()
</script>

<template>
  <div>
    {{ t('not-found') }}
    <RandomImage />
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
