<script lang="ts" setup>
interface Option {
  label: string
  value: string | number
}

export interface Props {
  options: Option[]
  name: string
  modelValue: string | number
  vertical: boolean
}

withDefaults(defineProps<Props>(), {
  vertical: false,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <component
    :is="vertical ? 'div' : 'span'"
    v-for="option in options"
    :key="option.value"
    :class="{
      horizontal: !vertical,
    }"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :model-value="modelValue"
      :name="name"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </component>
</template>

<style scoped>
.horizontal {
  margin-right: 20px;
}
</style>
