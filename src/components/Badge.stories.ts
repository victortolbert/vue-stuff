import type { Meta, StoryObj } from '@storybook/vue3'

import Badge from './Badge.vue'

const meta: Meta<typeof Badge> = {
  component: Badge,
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    label: 'Primary',
  },
}
