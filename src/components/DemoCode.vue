<script lang="ts" setup>
defineProps({
  code: {
    type: String,
    required: true,
  },
})

const working = ref(false)
const showCode = ref(false)

function seeLabel() {
  // eslint-disable-next-line no-unused-expressions
  showCode.value ? 'See demo' : 'See code'
}
</script>

<template>
  <article>
    <!-- FIXME: vue prism component not working -->
    <h5 v-if="working">
      <a href="#" role="button" @click.prevent="showCode = !showCode">
        {{ seeLabel }}
      </a>
    </h5>
    <div v-if="!showCode" class="demo__demo">
      <slot />
    </div>
    <div v-else class="demo__code">
      <pre>
        <code class="language-html">{{ code }}</code>
      </pre>
    </div>
  </article>
</template>
