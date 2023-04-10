// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomerChats> = (args) => {
//   return <CustomerChats {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomerChats from './CustomerChats'

export const generated = () => {
  return <CustomerChats />
}

export default {
  title: 'Components/CustomerChats',
  component: CustomerChats,
} as ComponentMeta<typeof CustomerChats>
