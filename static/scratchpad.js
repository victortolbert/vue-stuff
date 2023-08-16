import { resolve } from 'node:path'

import { faker } from '@faker-js/faker'

// import { compilerOptions } from './tsconfig.app.json'

import { randEmail, randFullName } from '@ngneat/falso'

const user = { email: randEmail(), name: randFullName() }
const emails = randEmail({ length: 10 })
console.log(emails, user)

const compilerOptions = {
  allowJs: true,
  experimentalDecorators: true,
  composite: true,
  baseUrl: '.',
  paths: {
    '@/*': ['./src/*'],
    '~/*': ['src/*'],
  },
}
function userCreator() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    id: faker.datatype.number(),
  }
}

const array = [...Array.from({ length: 5 })].map(() => userCreator())

array[0] = {
  ...array[0],
  name: 'Victor',
}
console.log(array)

const newArray = array.map((item) => {
  if (item.id === 3)
    return { ...item, name: 'Victor' }

  else
    return item
})
console.log(newArray)

const index = array.findIndex(item => item.id === 3)
const newItem = {
  ...array[index],
  name: 'Victor',
}
const newerArray = [
  ...array.slice(0, index),
  newItem,
  ...array.slice(index),
]
console.log(newArray)

const persons = [{
  id: '1',
  name: 'John',
  age: 12,
}, {
  id: '2',
  name: 'Tom',
  age: 13,
}, {
  id: '3',
  name: 'David',
  age: 14,
}]

function update(id, prop, val) {
  const person = persons.find((p) => {
    return p.id === id
  })

  if (person && person[prop])
    person[prop] = val
}

update('1', 'age', 77)
console.log(persons[0])

function resolveAliasesFromTypescriptConfig() {
  return Object.entries(compilerOptions.paths).reduce((acc, [key, [value]]) => {
    const aliasKey = key.substring(0, key.length - 2)
    const path = value.substring(0, value.length - 2)
    return {
      ...acc,
      [aliasKey]: resolve(__dirname, path),
    }
  }, {})
}
console.log(resolveAliasesFromTypescriptConfig())
