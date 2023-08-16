<script setup lang="ts">
import useDogQuery from '~/composables/useDogQuery'

const { data } = useDogQuery()
</script>

<template>
  <img v-if="data" :src="data.message">
</template>
