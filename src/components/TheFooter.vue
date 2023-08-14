<script setup lang="ts">
import { isDark, toggleDark } from '~/composables/dark'
import UContainer from '~/components/Container.vue'
</script>

<template>
  <UContainer>
    <nav class="w-full flex items-center gap-4 p-8">
      <button class="text-2xl" @click="toggleDark()">
        <span v-if="isDark" class="i-carbon-sun" />
        <span v-else class="i-carbon-moon" />
      </button>
    </nav>
  </UContainer>
</template>
