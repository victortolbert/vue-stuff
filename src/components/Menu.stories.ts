import type { Meta, StoryObj } from '@storybook/vue3'

import Menu from './Menu.vue'

const meta: Meta<typeof Menu> = {
  component: Menu,
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {}
