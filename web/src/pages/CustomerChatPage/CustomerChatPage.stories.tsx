import type { ComponentMeta } from '@storybook/react'

import CustomerChatPage from './CustomerChatPage'

export const generated = () => {
  return <CustomerChatPage />
}

export default {
  title: 'Pages/CustomerChatPage',
  component: CustomerChatPage,
} as ComponentMeta<typeof CustomerChatPage>
