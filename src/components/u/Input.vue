<script setup lang="ts">
export interface Props {
  label?: string
  modelValue: string
}

withDefaults(defineProps<Props>(), {
  label: 'Label',
})

defineEmits(['update:modelValue'])

// const { modelValue } = defineModels<{
//   modelValue: string
// }>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        v-bind="$attrs"
        :value="modelValue" class="block w-full border-0 rounded px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset dark:bg-white/5 sm:text-sm sm:leading-6 dark:text-white placeholder:text-gray-400 focus:ring-2 dark:ring-white/10 focus:ring-primary-600 focus:ring-inset dark:focus:ring-primary-500"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
  </div>
</template>
