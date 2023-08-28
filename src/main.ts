// import process from 'node:process'

import { ViteSSG } from 'vite-ssg'
import { Icon } from '@iconify/vue'
import Preview from 'vite-plugin-vue-component-preview/client'

import App from './App.vue'
import './assets/style.css'
// import { worker } from './mocks/browser'
import type { UserModule } from './types'

import routes from '~pages'

// if (process.env.NODE_ENV === 'development')
//   worker.start()

export const createApp: any = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    ctx.app.component('Icon', Icon)
    ctx.app.use(Preview)
  },
)

// export const createApp: any = ViteSSG(
//   App,
//   { routes },
//   async (ctx) => {
//     // install all modules under `modules/`
//     await Promise.all(Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx)))
//   },
// )
