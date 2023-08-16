<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      {{ msg }}
    </h1>
  </div>
</template>

<preview lang="md">
# This is preview page of HelloWorld.vue

## Props

| Props       | Description    |
| ----------- | -------------- |
| msg         | Title message  |

## Examples

<script setup>
const msgs = [
  'Hello Peter',
  'Hello John',
];
</script>

<template v-for="msg in msgs">
  <slot :msg="msg"></slot>
</template>
</preview>
