import type { Meta, StoryObj } from '@storybook/vue3'

import Select from './Select.vue'

const meta: Meta<typeof Select> = {
  component: Select,
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}
