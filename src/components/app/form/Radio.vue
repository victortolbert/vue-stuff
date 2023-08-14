<script lang="ts">
import { defineComponent, ref } from 'vue'

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
  setup() {
    const input = ref(null)

    return {
      input,
    }
  },
})
</script>

<template>
  <div>Radio</div>
</template>
