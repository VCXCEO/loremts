// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomerChatMessages> = (args) => {
//   return <CustomerChatMessages {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomerChatMessages from './CustomerChatMessages'

export const generated = () => {
  return <CustomerChatMessages />
}

export default {
  title: 'Components/CustomerChatMessages',
  component: CustomerChatMessages,
} as ComponentMeta<typeof CustomerChatMessages>
