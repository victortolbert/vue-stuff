<script setup lang="ts">
import UInput from '../../Input.vue'

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

function go() {
  if (name)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div class="grid gap-4">
    <UInput
      v-model="name"
      :label="t('intro.whats-your-name')"
      type="text"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />

    <button
      type="button"
      :disabled="!name"
      @click="go"
    >
      {{ t('button.go') }}
    </button>
  </div>
</template>
