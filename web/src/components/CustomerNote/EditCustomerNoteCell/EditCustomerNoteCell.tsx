import type {
  EditCustomerNoteById,
  UpdateCustomerNoteInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerNoteForm from 'src/components/CustomerNote/CustomerNoteForm'

export const QUERY = gql`
  query EditCustomerNoteById($id: Int!) {
    customerNote: customerNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      userId
    }
  }
`
const UPDATE_CUSTOMER_NOTE_MUTATION = gql`
  mutation UpdateCustomerNoteMutation(
    $id: Int!
    $input: UpdateCustomerNoteInput!
  ) {
    updateCustomerNote(id: $id, input: $input) {
      id
      note
      createdAt
      updatedAt
      customerId
      customerEmail
      customerPhone
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerNote,
}: CellSuccessProps<EditCustomerNoteById>) => {
  const [updateCustomerNote, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerNote updated')
        navigate(routes.customerNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCustomerNoteInput,
    id: EditCustomerNoteById['customerNote']['id']
  ) => {
    updateCustomerNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerNote {customerNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerNoteForm
          customerNote={customerNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
