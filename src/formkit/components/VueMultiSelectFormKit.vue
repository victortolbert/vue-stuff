<script setup>
import MultiSelect from 'vue-multiselect'

const props = defineProps({
  context: Object,
})
</script>

<template>
  <MultiSelect
    v-bind="context.attrs"
    :id="context.id"
    :model-value="context._value"
    :name="context.node.name"
    :disabled="context.disabled"
    :class="context.classes.input"
    @update:model-value="context.node.input($event)"
    @blur="context.handlers.blur"
  />
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style>
.formkit-input.multiselect {
  padding: 0;
}
</style>
