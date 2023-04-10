import type { FindCompanies } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Companies from 'src/components/Company/Companies'

export const QUERY = gql`
  query FindCompanies {
    companies {
      id
      name
      industry
      domain
      companyLogo
      emailAddress
      phoneNumber
      chatIdentifier
      apiKey
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No companies yet. '}
      <Link to={routes.newCompany()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ companies }: CellSuccessProps<FindCompanies>) => {
  return <Companies companies={companies} />
}
