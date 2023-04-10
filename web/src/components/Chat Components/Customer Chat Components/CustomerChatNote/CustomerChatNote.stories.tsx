// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomerChatNote> = (args) => {
//   return <CustomerChatNote {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomerChatNote from './CustomerChatNote'

export const generated = () => {
  return <CustomerChatNote />
}

export default {
  title: 'Components/CustomerChatNote',
  component: CustomerChatNote,
} as ComponentMeta<typeof CustomerChatNote>
