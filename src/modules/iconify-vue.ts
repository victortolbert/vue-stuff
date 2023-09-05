import { Icon } from '@iconify/vue'

import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('Icon', Icon)
}
