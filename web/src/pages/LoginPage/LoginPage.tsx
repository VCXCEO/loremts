import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, currentUser, logIn } = useAuth()
  const [firstLoginChecked, setFirstLoginChecked] = useState(false)

  const emailAddressRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isAuthenticated && firstLoginChecked) {
      if (currentUser?.firstLogin) {
        // Redirect the user to the "Change Password" screen
        navigate(routes.changePassword())
      } else {
        // Redirect the user to the home page
        navigate(routes.home())
      }
    }
  }, [isAuthenticated, currentUser, firstLoginChecked])

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await logIn({
        username: data.emailAddress,
        password: data.password,
      })

      // Set firstLoginChecked to true
      setFirstLoginChecked(true)
    } catch (error) {
      if (error.message) {
        toast.error(error.message)
      } else {
        toast.error('Login failed.')
      }
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="emailAddress"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email Address
                  </Label>
                  <TextField
                    name="emailAddress"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={emailAddressRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email Address is required',
                      },
                    }}
                  />

                  <FieldError name="emailAddress" className="rw-field-error" />

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
