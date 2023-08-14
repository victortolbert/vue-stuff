<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // @Prop({type: [String, Number, Boolean, Object], default: null})
  // value: string;

  // @Prop({type: [Boolean, Array], default: null})
  // modelValue: string;

  // @Prop({type: String, default: null})
  // name: string;

  // @Prop({type: String, default: null})
  // label: string;

  // @Prop({type: Boolean, default: false})
  // required: boolean;

  // @Prop({type: Boolean, default: false})
  // disabled: boolean;

  // @Prop({type: Boolean, default: false})
  // checked: boolean;

  // @Prop({type: Boolean, default: false})
  // indeterminate: boolean;

  // get toggle () {
  //   return this.modelValue
  // }

  // set toggle (value) {
  //   this.$emit('update:modelValue', value)
  // }

  // get inputClass () {
  //     return '';
  // }
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
