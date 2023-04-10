import type { EditCompanyNoteById, UpdateCompanyNoteInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompanyNoteForm from 'src/components/CompanyNote/CompanyNoteForm'

export const QUERY = gql`
  query EditCompanyNoteById($id: Int!) {
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
const UPDATE_COMPANY_NOTE_MUTATION = gql`
  mutation UpdateCompanyNoteMutation(
    $id: Int!
    $input: UpdateCompanyNoteInput!
  ) {
    updateCompanyNote(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  companyNote,
}: CellSuccessProps<EditCompanyNoteById>) => {
  const [updateCompanyNote, { loading, error }] = useMutation(
    UPDATE_COMPANY_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CompanyNote updated')
        navigate(routes.companyNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCompanyNoteInput,
    id: EditCompanyNoteById['companyNote']['id']
  ) => {
    updateCompanyNote({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CompanyNote {companyNote?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CompanyNoteForm
          companyNote={companyNote}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
