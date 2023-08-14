import type { Meta, StoryObj } from '@storybook/vue3'

import ButtonGroup from './ButtonGroup.vue'

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {}
