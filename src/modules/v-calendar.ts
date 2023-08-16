import { Calendar, DatePicker, setupCalendar } from 'v-calendar'
import 'v-calendar/style.css'

import type { UserModule } from '~/types'

export const install: UserModule = async ({ app }) => {
  // Use plugin defaults (optional)
  app.use(setupCalendar, {})

  // Use the components
  app.component('VCalendar', Calendar)
  app.component('VDatePicker', DatePicker)
}
