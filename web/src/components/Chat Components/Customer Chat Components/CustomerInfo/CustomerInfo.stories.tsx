// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CustomerInfo> = (args) => {
//   return <CustomerInfo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CustomerInfo from './CustomerInfo'

export const generated = () => {
  return <CustomerInfo />
}

export default {
  title: 'Components/CustomerInfo',
  component: CustomerInfo,
} as ComponentMeta<typeof CustomerInfo>
