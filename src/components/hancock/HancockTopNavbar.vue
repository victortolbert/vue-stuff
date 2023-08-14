<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import UContainer from '~/components/Container.vue'

const assetsURL = '/assets'

const user = reactive({
  slug: 'victor-tolbert',
  name: 'Victor Tolbert',
  email: 'vtolbert@example.com',
})

const links = ref([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'Playground', path: '/playground' },
  { name: 'Test', path: '/test' },
  { name: 'Login', path: '/login' },
  { name: 'Signin', path: '/signin' },
])

const openMobileMenu = ref(false)
const openUserMenu = ref(false)
const userMenuButton = ref(null)
const mobileMenuButton = ref(null)
</script>

<template>
  <nav class="z-20 bg-primary-700">
    <UContainer>
      <div class="relative h-16 flex items-center justify-between">
        <div class="flex items-center gap-8 px-2 lg:px-0">
          <RouterLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            {{ link.name }}
          </RouterLink>
          <div class="hidden lg:ml-6 lg:block">
            <div class="flex gap-8" />
          </div>
        </div>

        <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:items-center lg:justify-end lg:gap-3" />

        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            ref="mobileMenuButton"
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
            aria-controls="mobile-menu"
            aria-expanded="false"
            @click="openMobileMenu = !openMobileMenu"
          >
            <span class="sr-only">
              Open main menu
            </span>
            <!--
              Icon when menu is closed.
              Menu open: "hidden", Menu closed: "block"
            -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!--
              Icon when menu is open.
              Menu open: "block", Menu closed: "hidden"
            -->
            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="hidden lg:ml-4 lg:block">
          <div class="flex items-center gap-4">
            <!-- Profile dropdown -->
            <div class="relative ml-4 flex-shrink-0">
              <div>
                <button
                  id="user-menu-button"
                  ref="userMenuButton"
                  type="button"
                  class="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"
                  aria-expanded="false"
                  aria-haspopup="true"
                  @click="openUserMenu = !openUserMenu"
                >
                  <span class="sr-only">
                    Open user menu
                  </span>
                  User menu
                </button>
              </div>
              <!--
              Dropdown menu, show/hide based on menu state.
              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
              <div
                v-if="openUserMenu"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a
                  id="user-menu-item-2"
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
                  role="menuitem"
                  tabindex="-1"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="openMobileMenu" id="mobile-menu" class="lg:hidden">
      <div class="px-2 pb-3 pt-2 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
      </div>
      <div class="border-t border-gray-700 pb-3 pt-4">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full grayscale"
              :src="`${assetsURL}/img/users/${user.slug}.jpeg`"
              alt=""
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ user.name }}
            </div>
            <div class="text-sm font-medium text-gray-400">
              {{ user.email }}
            </div>
          </div>

          <button
            type="button"
            class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-800"
          >
            <span class="sr-only">
              View notifications
            </span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
        </div>

        <div class="mt-3 px-2 space-y-1">
          <a
            href="#"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
