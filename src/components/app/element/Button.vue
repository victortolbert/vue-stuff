<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'other'
  type?: 'button' | 'submit' | 'reset'
  label?: string
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  label: 'Button',
  block: false,
})

const buttonClass = computed(() => {
  if (props.variant === 'primary') {
    return `
        ${props.block ? 'w-full flex justify-center' : 'inline-flex'}
        items-center text-center
        px-3 py-2 text-sm font-semibold
        text-white rounded-md shadow-sm bg-primary-600 hover:bg-primary-500
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600
        whitespace-nowrap
      `
  }

  return `
      ${props.block ? 'w-full flex justify-center' : 'inline-flex'}
      items-center text-center
      px-3 py-2 text-sm font-semibold text-gray-900
      bg-white rounded-md shadow-sm
      ring-1 ring-inset ring-gray-300 hover:bg-gray-50
      whitespace-nowrap
    `
})
</script>

<template>
  <button :type="type" :class="buttonClass">
    <slot>{{ label }}</slot>
  </button>
</template>
