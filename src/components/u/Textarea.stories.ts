import type { Meta, StoryObj } from '@storybook/vue3'

import Textarea from './Textarea.vue'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {}
