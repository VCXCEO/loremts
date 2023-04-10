import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CompanyNoteForm from 'src/components/CompanyNote/CompanyNoteForm'

import type { CreateCompanyNoteInput } from 'types/graphql'

const CREATE_COMPANY_NOTE_MUTATION = gql`
  mutation CreateCompanyNoteMutation($input: CreateCompanyNoteInput!) {
    createCompanyNote(input: $input) {
      id
    }
  }
`

const NewCompanyNote = () => {
  const [createCompanyNote, { loading, error }] = useMutation(
    CREATE_COMPANY_NOTE_MUTATION,
    {
      onCompleted: () => {
        toast.success('CompanyNote created')
        navigate(routes.companyNotes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCompanyNoteInput) => {
    createCompanyNote({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CompanyNote</h2>
      </header>
      <div className="rw-segment-main">
        <CompanyNoteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCompanyNote
