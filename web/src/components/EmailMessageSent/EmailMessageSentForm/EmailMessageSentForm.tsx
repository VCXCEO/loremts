import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type {
  EditEmailMessageSentById,
  UpdateEmailMessageSentInput,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormEmailMessageSent = NonNullable<
  EditEmailMessageSentById['emailMessageSent']
>

interface EmailMessageSentFormProps {
  emailMessageSent?: EditEmailMessageSentById['emailMessageSent']
  onSave: (
    data: UpdateEmailMessageSentInput,
    id?: FormEmailMessageSent['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const EmailMessageSentForm = (props: EmailMessageSentFormProps) => {
  const onSubmit = (data: FormEmailMessageSent) => {
    props.onSave(data, props?.emailMessageSent?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEmailMessageSent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="messageId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Message id
        </Label>

        <TextField
          name="messageId"
          defaultValue={props.emailMessageSent?.messageId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="messageId" className="rw-field-error" />

        <Label
          name="conversationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Conversation id
        </Label>

        <TextField
          name="conversationId"
          defaultValue={props.emailMessageSent?.conversationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="conversationId" className="rw-field-error" />

        <Label
          name="extract"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extract
        </Label>

        <TextField
          name="extract"
          defaultValue={props.emailMessageSent?.extract}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="extract" className="rw-field-error" />

        <Label
          name="handleTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Handle time
        </Label>

        <NumberField
          name="handleTime"
          defaultValue={props.emailMessageSent?.handleTime}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="handleTime" className="rw-field-error" />

        <Label
          name="dateReceived"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date received
        </Label>

        <DatetimeLocalField
          name="dateReceived"
          defaultValue={formatDatetime(props.emailMessageSent?.dateReceived)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dateReceived" className="rw-field-error" />

        <Label
          name="emailId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email id
        </Label>

        <NumberField
          name="emailId"
          defaultValue={props.emailMessageSent?.emailId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailId" className="rw-field-error" />

        <Label
          name="emailConversationId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email conversation id
        </Label>

        <TextField
          name="emailConversationId"
          defaultValue={props.emailMessageSent?.emailConversationId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="emailConversationId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EmailMessageSentForm
