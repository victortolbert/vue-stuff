import { createHead } from '@unhead/vue'
import type { UserModule } from '~/types'

const head = createHead()

export const install: UserModule = ({ app }) => {
  app.use(head)
}
