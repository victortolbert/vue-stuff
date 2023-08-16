<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  value: {
    type: [String, Number],
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      v-bind="$attrs"
      h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 dark:ring-offset-gray-800 dark:focus:ring-primary-600
      @change="$emit('update:modelValue', value)"
    >
    <label
      v-if="label"
      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
  </div>
</template>
