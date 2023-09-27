<script setup lang="ts">
// import the composable
import { markRaw } from 'vue'
import { useModal } from '~/composables/useModal'

// use this to parse the component
import ModalConfirm from '~/components/ModalConfirm.vue'

// initialize modal
const modal = useModal()

// set the modal component to the ModalConfirm component and open the modal
function openConfirm() {
  modal.component.value = markRaw(ModalConfirm)
  modal.showModal()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <Teleport to="body">
      <ModalConfirm v-if="modal.show.value" @close="modal.hideModal" />
    </Teleport>

    <button @click="openConfirm">
      Open Confirm Modal
    </button>
  </div>
  <div class="absolute left-0 top-20 w-full bg-red-500 p-2">
    This will make things ugly
  </div>
</template>
