<script setup lang="ts">
</script>

<template>
  <div min-h-screen w-full flex flex-col>
    <header v-if="$slots.header">
      <slot name="header" />
    </header>

    <slot name="default" />

    <footer v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
