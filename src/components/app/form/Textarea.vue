<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: 3,
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
    const textarea = ref(null)

    return {
      textarea,
    }
  },
  computed: {
    textareaClass() {
      return 'form-textarea block border-gray-300 rounded shadow w-full sm:text-sm'
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
    <textarea
      :id="name"
      ref="textarea"
      :value="value"
      :name="name"
      :rows="rows"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      class="form-textarea"
      :class="textareaClass"
      v-bind="$attrs"
      @input="onInput"
    />
  </div>
</template>
