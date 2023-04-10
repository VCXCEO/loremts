// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof MagicBell> = (args) => {
//   return <MagicBell {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import MagicBell from './MagicBell'

export const generated = () => {
  return <MagicBell />
}

export default {
  title: 'Components/MagicBell',
  component: MagicBell,
} as ComponentMeta<typeof MagicBell>
