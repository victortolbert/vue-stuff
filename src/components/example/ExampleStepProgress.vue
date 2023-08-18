<script setup>
</script>

<template>
  <nav aria-label="Progress">
    <ol class="md:flex space-y-4 md:space-x-8 md:space-y-0">
      <li class="md:flex-1">
        <!-- Completed Step -->
        <a
          href="#"
          class="group flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 hover:border-primary-800 md:pb-0 md:pl-0 md:pt-4"
        >
          <span
            class="text-xs font-semibold uppercase text-primary-600 group-hover:text-primary-800"
          >Step 1</span>
          <span class="text-sm font-medium">Job details</span>
        </a>
      </li>

      <li class="md:flex-1">
        <!-- Current Step -->
        <a
          href="#"
          class="flex flex-col border-l-4 border-primary-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
          aria-current="step"
        >
          <span class="text-xs font-semibold uppercase text-primary-600">Step 2</span>
          <span class="text-sm font-medium">Application form</span>
        </a>
      </li>

      <li class="md:flex-1">
        <!-- Upcoming Step -->
        <a
          href="#"
          class="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 hover:border-gray-300 md:pb-0 md:pl-0 md:pt-4"
        >
          <span
            class="text-xs font-semibold uppercase text-gray-500 group-hover:text-gray-700"
          >Step 3</span>
          <span class="text-sm font-medium">Preview</span>
        </a>
      </li>
    </ol>
  </nav>
</template>
