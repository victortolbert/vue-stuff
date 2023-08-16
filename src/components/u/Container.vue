<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    as: {
      type: String,
      default: 'div',
    },
  },
})
</script>

<template>
  <component :is="as" class="mx-auto max-w-7xl px-4 lg:px-8 sm:px-6">
    <slot />
  </component>
</template>
