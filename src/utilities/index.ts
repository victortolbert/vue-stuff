import confetti from 'canvas-confetti'
import { reactify } from '@vueuse/core'
import YAML from 'js-yaml'
import type { Event } from '~/types'

export function ajax(url: string, options: any) {
  return fetch(url, options).then((response: any) =>
    response.json().then((data: object) => {
      if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {
          ...data,
          status: response.status,
          statusText: response.statusText,
        }
      }
      return data
    }),
  )
}

export function capitalize(str: string) {
  if (typeof str !== 'string')
    return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const clone = function (obj: object) {
  return JSON.parse(JSON.stringify(obj || {}))
}

export const filterList = function (list = [], filter: Array<any>) {
  return list.filter((item) => {
    for (const key in filter) {
      if (item[key] === undefined || item[key] !== filter[key])
        return false
    }

    return true
  })
}

export function formatAMPM(date: Date) {
  let hours = date.getHours()
  let minutes: number | string = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'

  hours %= 12
  hours = hours || 12
  minutes = minutes < 10 ? `0${minutes}` : minutes

  const strTime = `${hours}:${minutes} ${ampm}`

  return strTime
}

export function getEventIndexById(state: any, eventId: any) {
  return state.events.findIndex((event: Event) => event.id.toString() === eventId.toString())
}

export function getParameterByName(name: string, url?: string) {
  if (!url)
    url = window.location.href
  name = name.replace(/[[]]/g, '\\$&')
  const regex = new RegExp(`[?&#]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results)
    return null
  if (!results[2])
    return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// Credit http://www.paulirish.com/2009/random-hex-color-code-snippets/
export function randomHex() {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export const isoDateToEuroDate = function (isoDate: string) {
  const parts = isoDate.split('-')
  return `${parts[2]}.${parts[1]}.${parts[0]}`
}

export const isoDateToDate = function (isoDate: string) {
  return new Date(isoDate)
}

export function launchConfetti() {
  const end = Date.now() + 3 * 1000

  // go Buckeyes!
  const colors = ['#34495E', '#41B883']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    })

    if (Date.now() < end)
      requestAnimationFrame(frame)
  })()
}

// How To Cast An Array Of Objects Into A Dictionary Object in Typescript
// https://medium.com/@mmitchellgarcia?p=2a3b9790da81
export const normalizeArray = function<T> (array: Array<T>, indexKey: keyof T) {
  const normalizedObject: any = {}
  for (let i = 0; i < array.length; i++) {
    const key = array[i][indexKey]
    normalizedObject[key] = array[i]
  }
  return normalizedObject as { [key: string]: T }
}
// const test = normalizeArray([{id: 'abfq-f39f', name: 'Test'}], 'id')
// console.log(test)
// // {‘abfq-f39f’: {id: 1, name: 'Test'}}

export function saveStatePlugin(store: any) {
  store.subscribe((_: any, state: any) => {
    localStorage.setItem('board', JSON.stringify(state.board))
  })
}

export const searchAsEuroDate = function (value: string, searchString: string) {
  const parts = searchString.split('.')
  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`
  return isoDate === value
}

export const stringify = reactify((input: any) => YAML.dump(input, { skipInvalid: true }))

export const sum = ({ a, b }: { a: number; b: number }): number => a + b

console.log(sum({ a: 1, b: 2 }))

export function uuid() {
  return Math.random().toString(16).slice(2)
}
