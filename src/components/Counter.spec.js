import { expect, test } from 'vitest'

import { fireEvent, render, screen } from '@testing-library/vue'
import Counter from './Counter.vue'

test('increments value on click', async () => {
  // The `render` method renders the component into the document.
  // It also binds to `screen` all the available queries to interact with
  // the component.
  render(Counter)

  // queryByText returns the first matching node for the provided text
  // or returns null.
  expect(screen.queryByText('Times clicked: 0')).toBeTruthy()

  // getByText returns the first matching node for the provided text
  // or throws an error.
  const button = screen.getByText('increment')

  // Click a couple of times.
  await fireEvent.click(button)
  await fireEvent.click(button)

  expect(screen.queryByText('Times clicked: 2')).toBeTruthy()
})
