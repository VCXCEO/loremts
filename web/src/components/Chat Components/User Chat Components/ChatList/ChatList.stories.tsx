// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatList> = (args) => {
//   return <ChatList {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatList from './ChatList'

export const generated = () => {
  return <ChatList />
}

export default {
  title: 'Components/ChatList',
  component: ChatList,
} as ComponentMeta<typeof ChatList>
