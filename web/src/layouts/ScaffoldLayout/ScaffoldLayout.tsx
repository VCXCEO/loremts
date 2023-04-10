import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import Header from 'src/components/Header/Header'

type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <div style={{ marginTop: '75px' }}>
        <header className="rw-header">
          <h1 className="rw-heading rw-heading-primary">
            <Link to={routes[titleTo]()} className="rw-link">
              {title}
            </Link>
          </h1>
          <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
            <div className="rw-button-icon">+</div> {buttonLabel}
          </Link>
        </header>
      </div>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ScaffoldLayout