<script setup lang="ts">
import { onMounted } from 'vue'
import introJs from 'intro.js'
import 'intro.js/introjs.css'

// import 'intro.js/themes/introjs-dark.css'
// import 'intro.js/themes/introjs-flattener.css'
// import 'intro.js/themes/introjs-modern.css'
// import 'intro.js/themes/introjs-nassim.css'
// import 'intro.js/themes/introjs-nazanin.css'
// import 'intro.js/themes/introjs-royal.css'

import useDogQuery from '~/composables/useDogQuery'

const { data } = useDogQuery()

onMounted(() => {
  introJs().start()
  introJs().addHints()
})
</script>

<template>
  <UContainer>
    <div class="flex flex-col items-center rounded p-8">
      <div data-title="Welcome!" data-intro="Hello World! 👋" class="card-demo w-[300px]">
        <div class="card shadow--md flex flex-col overflow-hidden rounded bg-white shadow">
          <div class="card__image" data-intro="Intro.js can highlight on elements">
            <img
              src="/example-photo.jpg"
              alt="Image alt text"
              title="Logo Title Text 1"
              class="h-auto max-w-full"
            >
          </div>
          <div class="card__body" data-title="Farewell!" data-intro="And this is the last step!">
            <h4>Quaco Lighthouse</h4>
            <small>
              The Quaco Head Lighthouse is a well maintained lighthouse close to St.
              Martins. It is a short, beautiful walk to the lighthouse along the
              seashore.
            </small>
          </div>
        </div>
      </div>
    </div>

    <img v-if="data" :src="data.message">
  </UContainer>
</template>
