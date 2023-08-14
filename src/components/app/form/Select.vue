<script lang="ts">
import { get } from 'lodash-es'
import { defineComponent } from 'vue'

export default defineComponent({
  // @Prop({type: [String, Number, Object], default: ''})
  // value: string;

  // @Prop({ type: String, default: 'value' })
  // valueAttribute!: string;

  // @Prop({ type: String, default: 'label' })
  // optionAttribute!: string;

  // @Prop( { type: Array, default: () => [] })
  // options: any[]

  // @Prop( { type: String, default: null })
  // name: string

  // @Prop( { type: String, default: null })
  // placeholder: string

  // @Prop( { type: Boolean, default: false })
  // required: boolean

  // @Prop( { type: Boolean, default: false })
  // disabled: boolean

  // @Prop( { type: Boolean, default: false })
  // loading: boolean
  props: [
    'name',
    'value',
    'valueAttribute',
    'optionAttribute',
    'options',
    'required',
    'disabled',
    'loading',
    'placeholder',
    'selectClass',
  ],
  emits: ['change'],

  setup() { },

  computed: {
    normalizedOptionsWithPlaceholder() {
      if (!this.placeholder)
        return this.normalizedOptions

      return [
        {
          [this.valueAttribute]: '',
          [this.optionAttribute]: this.placeholder,
          disabled: true,
        },
        ...this.normalizedOptions,
      ]
    },
    normalizedOptions() {
      return this.options.map((option: any) => this.normalizeOption(option))
    },
    selectClass() {
      return 'bg-white border rounded-md border-gray-300 shadow-sm mt-1 w-full py-2 px-3 block sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-primary-500'
    },

  },
  methods: {
    onInput(event: any) {
      this.$emit('change', (event.target as HTMLSelectElement).value)
    },

    normalizeOption(option: any) {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          [this.valueAttribute]: option,
          [this.optionAttribute]: option,
        }
      }

      return {
        ...option,
        [this.valueAttribute]: this.guessOptionValue(option),
        [this.optionAttribute]: this.guessOptionText(option),
      }
    },

    guessOptionValue(option: any) {
      return get(option, this.valueAttribute, get(option, this.optionAttribute))
    },

    guessOptionText(option: any) {
      return get(option, this.optionAttribute, get(option, this.valueAttribute))
    },

    normalizedValue() {
      const normalizeModelValue = this.normalizeOption(this.value)
      const foundOption = this.normalizedOptionsWithPlaceholder.find(
        (option: any) => option[this.valueAttribute] === normalizeModelValue[this.valueAttribute],
      )

      if (!foundOption)
        return ''

      return foundOption[this.valueAttribute]
    },
  },
})
</script>

<template>
  <div>
    <select
      :id="name"
      :name="name"
      :value="value"
      :required="required"
      :disabled="disabled || loading"
      class="form-select"
      :class="selectClass"
      v-bind="$attrs"
      @input="onInput"
    >
      <template v-for="(option, index) in normalizedOptionsWithPlaceholder" :key="index">
        <option
          :value="option[valueAttribute]"
          :selected="option[valueAttribute] === normalizedValue"
          :disabled="option.disabled"
          v-text="option[optionAttribute]"
        />
      </template>
    </select>
  </div>
</template>
