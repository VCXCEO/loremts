import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteEmailMessageReceivedMutationVariables,
  FindEmailMessageReceivedById,
} from 'types/graphql'

const DELETE_EMAIL_MESSAGE_RECEIVED_MUTATION = gql`
  mutation DeleteEmailMessageReceivedMutation($id: Int!) {
    deleteEmailMessageReceived(id: $id) {
      id
    }
  }
`

interface Props {
  emailMessageReceived: NonNullable<
    FindEmailMessageReceivedById['emailMessageReceived']
  >
}

const EmailMessageReceived = ({ emailMessageReceived }: Props) => {
  const [deleteEmailMessageReceived] = useMutation(
    DELETE_EMAIL_MESSAGE_RECEIVED_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageReceived deleted')
        navigate(routes.emailMessageReceiveds())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteEmailMessageReceivedMutationVariables['id']
  ) => {
    if (
      confirm(
        'Are you sure you want to delete emailMessageReceived ' + id + '?'
      )
    ) {
      deleteEmailMessageReceived({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            EmailMessageReceived {emailMessageReceived.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{emailMessageReceived.id}</td>
            </tr>
            <tr>
              <th>Message id</th>
              <td>{emailMessageReceived.messageId}</td>
            </tr>
            <tr>
              <th>Conversation id</th>
              <td>{emailMessageReceived.conversationId}</td>
            </tr>
            <tr>
              <th>Extract</th>
              <td>{emailMessageReceived.extract}</td>
            </tr>
            <tr>
              <th>Handle time</th>
              <td>{emailMessageReceived.handleTime}</td>
            </tr>
            <tr>
              <th>Date received</th>
              <td>{timeTag(emailMessageReceived.dateReceived)}</td>
            </tr>
            <tr>
              <th>Email id</th>
              <td>{emailMessageReceived.emailId}</td>
            </tr>
            <tr>
              <th>Email conversation id</th>
              <td>{emailMessageReceived.emailConversationId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEmailMessageReceived({ id: emailMessageReceived.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(emailMessageReceived.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default EmailMessageReceived
