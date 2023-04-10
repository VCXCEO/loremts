import type {
  EditCustomerToUserChatNoteById,
  UpdateCustomerToUserChatNoteInput,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerToUserChatNoteForm from 'src/components/CustomerToUserChatNote/CustomerToUserChatNoteForm'

export const QUERY = gql`
  query EditCustomerToUserChatNoteById($id: Int!) {
    customerToUserChatNote: customerToUserChatNote(id: $id) {
      id
      note
      createdAt
      updatedAt
      customerToUserChatId
      customerId
      customerEmail
      userId
    }
  }
`
const UPDATE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION = gql`
  mutation UpdateCustomerToUserChatNoteMutation(
    $id: Int!
    $input: UpdateCustomerToUserChatNoteInput!
  ) {
    updateCustomerToUserChatNote(id: $id, input: $input) {
      id
      note
      createdAt
      updatedAt
      customerToUserChatId
      customerId
      customerEmail
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  customerToUserChatNote,
}: CellSuccessProps<EditCustomerToUserChatNoteById>) => {
  const [updateCustomerToUserChatNote, { loading, error }] = useMutation(
    UPDATE_CUSTOMER_TO_USER_CHAT_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CustomerToUserChatNote updated')
        navigate(routes.customerToUserChatNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCustomerToUserChatNoteInput,
    id: EditCustomerToUserChatNoteById['customerToUserChatNote']['id']
  ) => {
    updateCustomerToUserChatNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CustomerToUserChatNote {customerToUserChatNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CustomerToUserChatNoteForm
          customerToUserChatNote={customerToUserChatNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
