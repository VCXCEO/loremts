import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteEmailMessageSentMutationVariables,
  FindEmailMessageSentById,
} from 'types/graphql'

const DELETE_EMAIL_MESSAGE_SENT_MUTATION = gql`
  mutation DeleteEmailMessageSentMutation($id: Int!) {
    deleteEmailMessageSent(id: $id) {
      id
    }
  }
`

interface Props {
  emailMessageSent: NonNullable<FindEmailMessageSentById['emailMessageSent']>
}

const EmailMessageSent = ({ emailMessageSent }: Props) => {
  const [deleteEmailMessageSent] = useMutation(
    DELETE_EMAIL_MESSAGE_SENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('EmailMessageSent deleted')
        navigate(routes.emailMessageSents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (id: DeleteEmailMessageSentMutationVariables['id']) => {
    if (
      confirm('Are you sure you want to delete emailMessageSent ' + id + '?')
    ) {
      deleteEmailMessageSent({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            EmailMessageSent {emailMessageSent.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{emailMessageSent.id}</td>
            </tr>
            <tr>
              <th>Message id</th>
              <td>{emailMessageSent.messageId}</td>
            </tr>
            <tr>
              <th>Conversation id</th>
              <td>{emailMessageSent.conversationId}</td>
            </tr>
            <tr>
              <th>Extract</th>
              <td>{emailMessageSent.extract}</td>
            </tr>
            <tr>
              <th>Handle time</th>
              <td>{emailMessageSent.handleTime}</td>
            </tr>
            <tr>
              <th>Date received</th>
              <td>{timeTag(emailMessageSent.dateReceived)}</td>
            </tr>
            <tr>
              <th>Email id</th>
              <td>{emailMessageSent.emailId}</td>
            </tr>
            <tr>
              <th>Email conversation id</th>
              <td>{emailMessageSent.emailConversationId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEmailMessageSent({ id: emailMessageSent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(emailMessageSent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default EmailMessageSent
