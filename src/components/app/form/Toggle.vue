<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['name', 'value', 'type', 'required', 'placeholder', 'disabled', 'loading', 'inputClass'],
  emits: ['input'],
  setup() {
    const input = ref(null)

    return {
      input,
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
})
</script>

<template>
  <div>
    <select
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
    />
  </div>
</template>
