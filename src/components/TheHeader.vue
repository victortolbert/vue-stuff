<template>
  <header>
    <nav class="h-16 w-full flex items-center justify-between bg-primary-50 px-6 shadow">
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>
    </nav>
  </header>
</template>
