import './assets/style.css'

import { ViteSSG } from 'vite-ssg'
import Preview from 'vite-plugin-vue-component-preview/client'
import App from './App.vue'

import { worker } from '~/mocks/browser'
import type { UserModule } from '~/types'

import routes from '~pages'

export const createApp: any = ViteSSG(App, { routes, base: import.meta.env.BASE_URL }, (ctx) => {
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(ctx))

  ctx.app.use(Preview)
},
)

// export const createApp: any = ViteSSG(
//   App,
//   { routes },
//   async (ctx) => {
//     await Promise.all(Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx)))
//   },
// )

// if (import.meta.env.NODE_ENV === 'development')
worker.start()
