import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'
import { flushPromises } from '@vue/test-utils'
import { useMovies } from './useMovies'

// 1. Mock global.fetch with vi.fn()
globalThis.fetch = vi.fn()

// 2.Mock returned value of fetch
function createMockResolveValue(data) {
  return { json: () => new Promise(resolve => resolve(data)), ok: true }
}

// 3. Mount test app with createApp()
// 4. Trigger useMovies in setup()
function withSetup(hook) {
  let result

  const app = createApp({
    setup() {
      result = hook()
      return () => {}
    },
  })

  app.mount(document.createElement('div'))

  return [result, app]
}

describe('useMovies', () => {
  beforeAll(() => {
    globalThis.fetch.mockReturnValue(createMockResolveValue({
      results: [
        {
          title: 'A New Hope',
        },
      ],
    }))
  })

  it.skip('should fetch movies', async () => {
    // 5. Return & assert results to the test suit
    const [results, app] = withSetup(useMovies)

    // 2. Flush all asynchronous calls with flushPromises from @vue/test-utils
    await flushPromises()
    expect(results.movies.value.length).toEqual(1)

    // 6. Unmount the test app afterwards.
    app.unmount()
  })
})
