<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    modelValue: {
      type: [Boolean, Array],
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputClass() {
      return ''
    },
    toggle: {
      get() {
        return this.modelValue
      },
      set(value: any) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>

<template>
  <div class="ui-wrapper flex items-center gap-2">
    <div class="h-5 flex items-center">
      <input
        :id="name"
        v-model="toggle"
        :name="name"
        :required="required"
        :value="value"
        :disabled="disabled"
        :checked="checked"
        :indeterminate="indeterminate"
        type="checkbox"
        class="form-checkbox"
        :class="inputClass"
        v-bind="$attrs"
      >
    </div>
    <div v-if="label || $slots.label" class="ms-3 text-sm">
      <label :for="name" class="ui-label">
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="ui-required">*</span>
      </label>
    </div>
  </div>
</template>
