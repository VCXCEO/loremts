import type {
  QueryResolvers,
  MutationResolvers,
  CallRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const calls: QueryResolvers['calls'] = () => {
  return db.call.findMany()
}

export const call: QueryResolvers['call'] = ({ id }) => {
  return db.call.findUnique({
    where: { id },
  })
}

export const createCall: MutationResolvers['createCall'] = ({ input }) => {
  return db.call.create({
    data: input,
  })
}

export const updateCall: MutationResolvers['updateCall'] = ({ id, input }) => {
  return db.call.update({
    data: input,
    where: { id },
  })
}

export const deleteCall: MutationResolvers['deleteCall'] = ({ id }) => {
  return db.call.delete({
    where: { id },
  })
}

export const Call: CallRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.call.findUnique({ where: { id: root?.id } }).customer()
  },
  company: (_obj, { root }) => {
    return db.call.findUnique({ where: { id: root?.id } }).company()
  },
  user: (_obj, { root }) => {
    return db.call.findUnique({ where: { id: root?.id } }).user()
  },
  callNotes: (_obj, { root }) => {
    return db.call.findUnique({ where: { id: root?.id } }).callNotes()
  },
}
