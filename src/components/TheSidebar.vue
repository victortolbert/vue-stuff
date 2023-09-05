<script setup lang="ts">
import { SidebarMenu } from 'vue-sidebar-menu'

defineProps(['menu'])

const collapsed = ref()
const disableHover = ref(false)
const hideToggle = ref(false)
const relative = ref(false)
const rtl = ref(false)
const showChild = ref(false)
const showOneChild = ref(true)
const theme = ref('')
const width = ref('320px')
const widthCollapsed = ref('64px')

const storageIsCollapsed = window.localStorage.getItem('isSidebarCollapsed')

if (storageIsCollapsed)
  collapsed.value = JSON.parse(storageIsCollapsed)

watch(collapsed, (val) => {
  window.localStorage.setItem('isSidebarCollapsed', JSON.stringify(val))
})

function onItemClick(event: any, item: any) {
  console.log(event, item)

  if (item.title === 'Logout') {
    // TODO: logout
  }
}

function onToggleCollapse() {}
</script>

<template>
  <SidebarMenu
    v-model:collapsed="collapsed"
    :disable-hover="disableHover"
    :hide-toggle="hideToggle"
    :menu="menu"
    :relative="relative"
    :rtl="rtl"
    :show-child="showChild"
    :show-one-child="showOneChild"
    :theme="theme"
    :width-collapsed="widthCollapsed"
    :width="width"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  >
    <template #header>
      <div class="h-16 bg-white">
        <RouterLink
          to="/"
          class="h-16 flex items-center bg-primary-50 text-primary-500 space-x-2"
        >
          <LogoMarkHancock class="ml-2 flex-shrink-0" />

          <span v-if="!collapsed">
            <LogoExemplar class="ml-2" />
          </span>
        </RouterLink>
      </div>
    </template>

    <template #toggle-icon>
      <span class="app-sidebar-toggle-icon">
        <Icon
          icon="mdi:arrow-collapse-left"
          class="h-6 w-6 origin-center text-primary-200 transition duration-300 ease-in-out group-hover:text-white"
          :class="[collapsed ? '-rotate-180 ' : '']"
        />
      </span>
    </template>
  </SidebarMenu>
</template>
