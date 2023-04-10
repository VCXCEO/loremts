// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ChatUserInfo> = (args) => {
//   return <ChatUserInfo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ChatUserInfo from './ChatUserInfo'

export const generated = () => {
  return <ChatUserInfo />
}

export default {
  title: 'Components/ChatUserInfo',
  component: ChatUserInfo,
} as ComponentMeta<typeof ChatUserInfo>
