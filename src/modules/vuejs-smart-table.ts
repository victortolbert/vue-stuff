import VueCreditCardValidation from 'vue-credit-card-validation'

import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.use(VueCreditCardValidation)
}
