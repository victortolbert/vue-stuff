import type { Meta, StoryObj } from '@storybook/vue3'

import Sidebar from './Sidebar.vue'

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}
