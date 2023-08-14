<script lang="ts" setup>
import { ref } from 'vue'

const navigation = ref([
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
])
</script>

<template>
  <nav
    aria-label="Sidebar"
    flex flex-1 flex-col
  >
    <ul
      role="list"
      class="-mx-2 space-y-1"
    >
      <li
        v-for="item in navigation"
        :key="item.name"
      >
        <a
          :href="item.href"
          group
          flex gap-x-3
          rounded-md
          p-2 pl-3
          text-sm font-semibold leading-6
          :class="[
            item.current
              ? 'bg-gray-50 text-primary-600'
              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50',
          ]"
        >{{ item.name }}</a>
      </li>
    </ul>
  </nav>
</template>
