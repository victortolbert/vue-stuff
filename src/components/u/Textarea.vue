<script lang="ts" setup>
export interface Props {
  modelValue: string
  label?: string
  help?: string
}
withDefaults(defineProps<Props>(), {
  modelValue: '',
})
defineEmits(['update:modelValue'])
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label for="about" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
      {{ label }}
    </label>

    <div class="mt-1">
      <textarea v-bind="$attrs" rows="3" class="block w-full border-0 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset dark:bg-white/5 sm:text-sm sm:leading-6 dark:text-white placeholder:text-gray-400 focus:ring-2 dark:ring-white/10 focus:ring-primary-600 focus:ring-inset dark:focus:ring-primary-500" />
    </div>

    <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
      Write a few sentences about yourself.
    </p>
  </div>
</template>
