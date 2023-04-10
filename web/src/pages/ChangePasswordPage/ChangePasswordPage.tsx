import { useState } from 'react'

import gql from 'graphql-tag'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const onSubmit = async (data) => {
    setLoading(true)

    try {
      await updateUser({
        variables: {
          id: currentUser.id,
          input: {
            password: data.newPassword,
            firstLogin: false,
          },
        },
      })

      toast.success('Password changed successfully')
      navigate(routes.home())
    } catch (error) {
      toast.error('Error changing password: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <MetaTags title="Change Password" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-change-password-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Change Password
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="newPassword"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    New Password
                  </Label>
                  <PasswordField
                    name="newPassword"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="new-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'New password is required',
                      },
                    }}
                  />

                  <FieldError name="newPassword" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit
                      className="rw-button rw-button-blue"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ChangePasswordPage
