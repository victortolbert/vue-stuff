<script setup lang="ts">
export interface Props {
  label: string
}
withDefaults(defineProps<Props>(), {
  label: 'Default label',
})
</script>

<template>
  <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
    <slot>{{ label }}</slot>
  </span>
</template>
