import type { Meta, StoryObj } from '@storybook/vue3'

import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
