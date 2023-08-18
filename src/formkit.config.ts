import { genesisIcons } from '@formkit/icons'
import { generateClasses } from '@formkit/themes'
import type { DefaultConfigOptions } from '@formkit/vue'
import myTailwindTheme from './tailwind-theme'

const config: DefaultConfigOptions = {
  config: {
    // pass our theme object to generateClasses
    classes: generateClasses(myTailwindTheme),
  },
  icons: {
    // include supporting icons from @formkit/icons
    ...genesisIcons,
  },
  messages: {
    en: {
      validation: {
        username_is_unique({ args, name, node }) {
          return `${node.value} is already taken`
        },
      },
    },
  },
  rules: {
    username_is_unique(node) {
      const usernames = ['jpschroeder', 'luanguyen', 'danielkelly_io']
      return !usernames.includes(node.value as string)
    },
  },
}

export default config
