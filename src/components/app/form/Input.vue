<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: null,
    },
    placeholder: {
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['input'],
  setup() {
    const input = ref(null)

    return {
      input,
    }
  },
  computed: {
    inputClass() {
      const disabled = this.disabled ? 'disabled:opacity-75 disabled:select-none' : ''

      return `form-input ${disabled}`
    },
  },
  methods: {
    onInput(event: any) {
      this.$emit('input', event.target.value)
    },
  },

})
</script>

<template>
  <div>
    <input
      :id="name"
      ref="input"
      :name="name"
      :value="value"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled || loading"
      :class="inputClass"
      v-bind="$attrs"
      @input="onInput"
    >
  </div>
</template>
