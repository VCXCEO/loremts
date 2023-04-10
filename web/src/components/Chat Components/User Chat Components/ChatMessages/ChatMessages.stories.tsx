// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatMessages> = (args) => {
//   return <ChatMessages {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatMessages from './ChatMessages'

export const generated = () => {
  return <ChatMessages />
}

export default {
  title: 'Components/ChatMessages',
  component: ChatMessages,
} as ComponentMeta<typeof ChatMessages>
