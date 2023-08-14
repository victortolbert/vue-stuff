<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    help: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div class="relative">
    <label for="" class="block whitespace-nowrap text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1">
      <div class="relative">
        <slot />
      </div>
      <p v-if="help" class="mt-1 text-xs">
        {{ help }}
      </p>
    </div>
  </div>
</template>
