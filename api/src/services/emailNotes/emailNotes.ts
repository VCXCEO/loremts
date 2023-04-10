import type {
  QueryResolvers,
  MutationResolvers,
  EmailNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const emailNotes: QueryResolvers['emailNotes'] = () => {
  return db.emailNote.findMany()
}

export const emailNote: QueryResolvers['emailNote'] = ({ id }) => {
  return db.emailNote.findUnique({
    where: { id },
  })
}

export const createEmailNote: MutationResolvers['createEmailNote'] = ({
  input,
}) => {
  return db.emailNote.create({
    data: input,
  })
}

export const updateEmailNote: MutationResolvers['updateEmailNote'] = ({
  id,
  input,
}) => {
  return db.emailNote.update({
    data: input,
    where: { id },
  })
}

export const deleteEmailNote: MutationResolvers['deleteEmailNote'] = ({
  id,
}) => {
  return db.emailNote.delete({
    where: { id },
  })
}

export const EmailNote: EmailNoteRelationResolvers = {
  email: (_obj, { root }) => {
    return db.emailNote.findUnique({ where: { id: root?.id } }).email()
  },
  customer: (_obj, { root }) => {
    return db.emailNote.findUnique({ where: { id: root?.id } }).customer()
  },
  user: (_obj, { root }) => {
    return db.emailNote.findUnique({ where: { id: root?.id } }).user()
  },
}
