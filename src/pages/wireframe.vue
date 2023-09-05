<script setup>
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>')
const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <ul>
    <li v-for="country in countries" :key="country.id">
      {{ country.name }}
    </li>
  </ul>
</template>
