import './assets/style.css'

// import '@unocss/reset/tailwind.css'
// import './assets/main.css'
// import 'uno.css'
// import 'virtual:unocss-devtools'

import process from 'node:process'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'

import App from './App.vue'
import router from './router'

import { worker } from './mocks/browser'

function prepare() {
  if (process.env.NODE_ENV === 'development')
    return worker.start()

  return Promise.resolve()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('Icon', Icon)

prepare().then(() => {
  app.mount('#app')
})
