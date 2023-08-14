<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  primary?: boolean
}>(), {
  type: 'button',
  disabled: false,
  primary: false,
})
const classes = computed(() => {
  const base = 'rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm'
  if (props.primary)
    return `${base} bg-primary-600 text-white hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500`

  return `${base} bg-white text-gray-900 ring-1 ring-inset ring-gray-300  hover:bg-gray-50 focus:ring-gray-300 dark:ring-0 dark:bg-white/10 dark:text-white dark:hover:bg-white/20`
})
</script>

<template>
  <button v-bind="$attrs" type="button" :class="classes">
    <slot>Button text</slot>
  </button>
</template>
