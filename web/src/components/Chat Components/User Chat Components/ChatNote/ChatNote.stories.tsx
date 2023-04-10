// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatNote> = (args) => {
//   return <ChatNote {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatNote from './ChatNote'

export const generated = () => {
  return <ChatNote />
}

export default {
  title: 'Components/ChatNote',
  component: ChatNote,
} as ComponentMeta<typeof ChatNote>
