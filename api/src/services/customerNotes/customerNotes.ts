import type {
  QueryResolvers,
  MutationResolvers,
  CustomerNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customerNotes: QueryResolvers['customerNotes'] = () => {
  return db.customerNote.findMany()
}

export const customerNote: QueryResolvers['customerNote'] = ({ id }) => {
  return db.customerNote.findUnique({
    where: { id },
  })
}

export const createCustomerNote: MutationResolvers['createCustomerNote'] = ({
  input,
}) => {
  return db.customerNote.create({
    data: input,
  })
}

export const updateCustomerNote: MutationResolvers['updateCustomerNote'] = ({
  id,
  input,
}) => {
  return db.customerNote.update({
    data: input,
    where: { id },
  })
}

export const deleteCustomerNote: MutationResolvers['deleteCustomerNote'] = ({
  id,
}) => {
  return db.customerNote.delete({
    where: { id },
  })
}

export const CustomerNote: CustomerNoteRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.customerNote.findUnique({ where: { id: root?.id } }).customer()
  },
  user: (_obj, { root }) => {
    return db.customerNote.findUnique({ where: { id: root?.id } }).user()
  },
}
