import { defaultConfig, plugin } from '@formkit/vue'
import formKitConfig from '~/formkit.config'

// import { generateClasses } from '@formkit/themes'
// import myTailwindTheme from '../tailwind-theme'
// import "../dist/assets/index-8c162198.css"

import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  // app.use(plugin, defaultConfig({
  //   config: {
  //     classes: generateClasses(myTailwindTheme),
  //   },
  // }))

  app.use(plugin, defaultConfig(formKitConfig))
}
