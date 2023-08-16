<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]
const selectedPerson = ref(people[0])
</script>

<template>
  <Listbox v-model="selectedPerson">
    <ListboxButton>{{ selectedPerson.name }}</ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="person in people"
        :key="person.id"
        :value="person"
        :disabled="person.unavailable"
      >
        {{ person.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
