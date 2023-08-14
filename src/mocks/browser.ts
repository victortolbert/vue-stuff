// 1. Import the "setupWorker" function that configures and registers
// the Service Worker responsible for request interception.
import { setupWorker } from 'msw'

// 2. Import your "happy paths" handlers.
import { handlers } from './handlers'

// 3. Create a "worker" instance that you can later use
// to enable mocking and change its behavior on runtime.
export const worker = setupWorker(...handlers) as any
