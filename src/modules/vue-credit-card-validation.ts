// @ts-expect-error - module implicitly has an 'any' type
import SmartTable from 'vuejs-smart-table'

import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(SmartTable)
}
