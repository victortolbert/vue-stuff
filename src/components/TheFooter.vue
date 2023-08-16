<script setup lang="ts">
import { isDark, toggleDark } from '~/composables/dark'
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <UContainer>
    <nav class="w-full flex items-center gap-4 p-4">
      <button class="flex items-center text-2xl" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div v-if="isDark" class="i-carbon-sun text-gray-400" />
        <div v-else class="i-carbon-moon text-gray-400" />
      </button>

      <button class="flex items-center text-2xl" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div class="i-carbon-language text-gray-400" />
      </button>
    </nav>
  </UContainer>
</template>
