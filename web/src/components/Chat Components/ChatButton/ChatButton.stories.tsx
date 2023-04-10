// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatButton> = (args) => {
//   return <ChatButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatButton from './ChatButton'

export const generated = () => {
  return <ChatButton />
}

export default {
  title: 'Components/ChatButton',
  component: ChatButton,
} as ComponentMeta<typeof ChatButton>
