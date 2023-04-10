import type {
  QueryResolvers,
  MutationResolvers,
  CallNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const callNotes: QueryResolvers['callNotes'] = () => {
  return db.callNote.findMany()
}

export const callNote: QueryResolvers['callNote'] = ({ id }) => {
  return db.callNote.findUnique({
    where: { id },
  })
}

export const createCallNote: MutationResolvers['createCallNote'] = ({
  input,
}) => {
  return db.callNote.create({
    data: input,
  })
}

export const updateCallNote: MutationResolvers['updateCallNote'] = ({
  id,
  input,
}) => {
  return db.callNote.update({
    data: input,
    where: { id },
  })
}

export const deleteCallNote: MutationResolvers['deleteCallNote'] = ({ id }) => {
  return db.callNote.delete({
    where: { id },
  })
}

export const CallNote: CallNoteRelationResolvers = {
  call: (_obj, { root }) => {
    return db.callNote.findUnique({ where: { id: root?.id } }).call()
  },
  customer: (_obj, { root }) => {
    return db.callNote.findUnique({ where: { id: root?.id } }).customer()
  },
  user: (_obj, { root }) => {
    return db.callNote.findUnique({ where: { id: root?.id } }).user()
  },
}
