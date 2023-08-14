<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    error: String,
    modelValue: String,
  },

  emits: ['update:modelValue', 'blur'],
})
</script>

<template>
  <div class="form-group">
    <input
      v-bind="$attrs"
      :value="modelValue"
      class="form-input"
      @input="$emit('update:modelValue', ($event.target as any).value)"
      @blur="$emit('blur')"
    >
    <span class="form-help error">{{ error }}</span>
  </div>
</template>
