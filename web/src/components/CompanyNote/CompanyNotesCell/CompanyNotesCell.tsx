import type { FindCompanyNotes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CompanyNotes from 'src/components/CompanyNote/CompanyNotes'

export const QUERY = gql`
  query FindCompanyNotes {
    companyNotes {
      id
      note
      createdAt
      updatedAt
      companyId
      companyName
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No companyNotes yet. '}
      <Link to={routes.newCompanyNote()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyNotes,
}: CellSuccessProps<FindCompanyNotes>) => {
  return <CompanyNotes companyNotes={companyNotes} />
}
