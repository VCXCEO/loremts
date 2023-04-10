import type { ComponentMeta } from '@storybook/react'

import ChangePasswordPage from './ChangePasswordPage'

export const generated = () => {
  return <ChangePasswordPage />
}

export default {
  title: 'Pages/ChangePasswordPage',
  component: ChangePasswordPage,
} as ComponentMeta<typeof ChangePasswordPage>
