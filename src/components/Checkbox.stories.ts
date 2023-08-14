import type { Meta, StoryObj } from '@storybook/vue3'

import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    label: 'Checkbox',
  },
}
