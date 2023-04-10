// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof UserChats> = (args) => {
//   return <UserChats {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import UserChats from './UserChats'

export const generated = () => {
  return <UserChats />
}

export default {
  title: 'Components/UserChats',
  component: UserChats,
} as ComponentMeta<typeof UserChats>
