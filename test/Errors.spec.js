import test from 'ava'
import { Errors } from './Errors'

test('Set errors object', (t) => {
  const errors = new Errors()

  const errorsResponse = {
    input: ['Error Message'],
  }

  errors.set(errorsResponse)

  t.is(errorsResponse, errors.errors)
})

test('Check if a field has an error', (t) => {
  const errors = new Errors()

  errors.set({ field: 'message' })

  t.is(true, errors.has('field'))
})

test('Check if a field does not have an error', (t) => {
  const errors = new Errors()

  t.is(false, errors.has('field'))
})

test('Get first error message for specific field', (t) => {
  const errors = new Errors()

  errors.set({
    field: [
      'First Message',
      'Second Message',
    ],
  })

  t.is('First Message', errors.get('field'))
})

test('Get all error messages for specific field', (t) => {
  const errors = new Errors()
  const data = {
    email: [
      'First Error Message',
      'Second Error Message',
    ],
  }

  errors.set(data)

  t.is(data.email, errors.getAll('email'))
})

test('Clear an error message', (t) => {
  const errors = new Errors()

  errors.set({
    name: ['Error message'],
    email: ['Error message'],
  })

  t.is(true, errors.has('name'))
  t.is(true, errors.has('email'))

  errors.clear('name')

  t.is(false, errors.has('name'))
  t.is(true, errors.has('email'))
})

test('Clear all error messages', (t) => {
  const errors = new Errors()

  errors.set({
    name: ['Error message'],
    email: ['Error message'],
  })

  t.is(true, errors.has('name'))
  t.is(true, errors.has('email'))

  errors.clear()

  t.is(false, errors.has('name'))
  t.is(false, errors.has('email'))
})

test('It has any error', (t) => {
  const errors = new Errors()

  const errorsResponse = {
    input: ['Error Message'],
  }

  errors.set(errorsResponse)

  t.is(errors.any(), true)
})

test('It has no errors ', (t) => {
  const errors = new Errors()

  t.is(errors.any(), false)
})
