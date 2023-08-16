<script lang="ts" setup>
import { uuid } from '~/utilities'

export interface Props {
  modelValue: string | number
  label?: string
  help?: string
  options: string[]
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
})

defineEmits(['update:modelValue'])

const id = uuid()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium leading-6 text-gray-900">
      {{ label }}
    </label>
    <div class="mt-2">
      <select
        :id="id"
        :value="modelValue"
        v-bind="{
          ...$attrs,
          onChange: ($event) => {
            $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
          },
        }"
        class="block w-full border-0 rounded px-2 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset sm:max-w-xs sm:text-sm sm:leading-6 focus:ring-2 focus:ring-primary-600 focus:ring-inset"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          :selected="option === modelValue"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
