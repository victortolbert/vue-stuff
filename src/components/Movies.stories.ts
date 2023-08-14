import type { Meta, StoryObj } from '@storybook/vue3'

import Movies from './Movies.vue'

const meta: Meta<typeof Movies> = {
  component: Movies,
}

export default meta
type Story = StoryObj<typeof Movies>

export const Primary: Story = {
}
