import type { Meta, StoryObj } from '@storybook/vue3'

import RadioGroup from './RadioGroup.vue'

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {}
