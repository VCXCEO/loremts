import type { FindCompanyNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CompanyNote from 'src/components/CompanyNote/CompanyNote'

export const QUERY = gql`
  query FindCompanyNoteById($id: Int!) {
    companyNote: companyNote(id: $id) {
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

export const Empty = () => <div>CompanyNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyNote,
}: CellSuccessProps<FindCompanyNoteById>) => {
  return <CompanyNote companyNote={companyNote} />
}
