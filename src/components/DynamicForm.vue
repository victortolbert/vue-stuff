<script>
import { ErrorMessage, Field, Form } from 'vee-validate'

export default {
  name: 'DynamicForm',
  components: {
    UForm: Form,
    Field,
    ErrorMessage,
  },
  props: {
    schema: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <UForm>
    <div
      v-for="{ as, name, label, children, ...attrs } in schema.fields"
      :key="name"
      class="form-group"
    >
      <label :for="name">{{ label }}</label>
      <Field :id="name" :as="as" :name="name" v-bind="attrs" class="form-input">
        <template v-if="children && children.length">
          <component
            :is="tag"
            v-for="({ tag, text, ...childAttrs }, idx) in children"
            :key="idx"
            v-bind="childAttrs"
          >
            {{ text }}
          </component>
        </template>
      </Field>
      <ErrorMessage :name="name" class="form-help error" />
    </div>

    <button>Submit</button>
  </UForm>
</template>
