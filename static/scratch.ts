import { add } from 'date-fns'
import { slugify } from '../src/utilities/slugify'

console.log(slugify('Hello World'))

let anyValue: any
let unknownValue: unknown

// anyValue() // anything goes with any!
// unknownValue() // unknown is more restrictive

// This is called a type guard
if (typeof unknownValue === 'function')
  unknownValue() // then it works!

if (typeof unknownValue === 'number')
  unknownValue++ // then it works!

(unknownValue as number)++ // this also works

// TLDR: unknown is a bit more type safe and
// makes you check the type before using it

interface Person {
  name: string
  age: number
  cool: boolean
}

const name: string = 'Scratch'

console.log(name)

const video: HTMLVideoElement | null = document.querySelector('.video')

if (!video)
  throw new Error('No video found')

video.play()

// const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true,
// })

function calculateBill(total: number, tip: number = 0.1): string {
  const owed: number = total * (1 + tip)
  const sentence: string = `The total bill is ${owed}`
  return sentence
}

function generatePersonHTML(person: Person): string {
  return /* html */`
  <div>
    <h2>${person.name}</h2>
    <p>${person.age}</p>
    <p>${person.cool.toString()}</p>
  </div>
  `
}

const futureDate: Date = add(new Date(), {
  days: 3,
})
