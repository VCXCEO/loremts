import type { FindEmailNoteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EmailNote from 'src/components/EmailNote/EmailNote'

export const QUERY = gql`
  query FindEmailNoteById($id: Int!) {
    emailNote: emailNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      emailId
      customerId
      customerEmail
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>EmailNote not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ emailNote }: CellSuccessProps<FindEmailNoteById>) => {
  return <EmailNote emailNote={emailNote} />
}
