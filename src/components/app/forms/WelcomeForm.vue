<script setup lang="ts">
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
  <div class="grid">
    <FormKit
      id="name"
      v-model="name"
      name="name"
      :label="t('intro.whats-your-name')"
      type="text"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <FormKit id="button" name="button" type="button" :label="t('button.go')" :disabled="!name" @click="go" />
  </div>
</template>
