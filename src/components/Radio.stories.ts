import type { Meta, StoryObj } from '@storybook/vue3'

import Radio from './Radio.vue'

const meta: Meta<typeof Radio> = {
  component: Radio,
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {}
