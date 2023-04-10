import type {
  QueryResolvers,
  MutationResolvers,
  CustomerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const customers: QueryResolvers['customers'] = () => {
  return db.customer.findMany()
}

export const customer: QueryResolvers['customer'] = ({ id }) => {
  return db.customer.findUnique({
    where: { id },
  })
}

export const createCustomer: MutationResolvers['createCustomer'] = ({
  input,
}) => {
  return db.customer.create({
    data: input,
  })
}

export const updateCustomer: MutationResolvers['updateCustomer'] = ({
  id,
  input,
}) => {
  return db.customer.update({
    data: input,
    where: { id },
  })
}

export const deleteCustomer: MutationResolvers['deleteCustomer'] = ({ id }) => {
  return db.customer.delete({
    where: { id },
  })
}

export const Customer: CustomerRelationResolvers = {
  companies: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).companies()
  },
  calls: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).calls()
  },
  emails: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).emails()
  },
  escalations: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).escalations()
  },
  customerToUserChats: (_obj, { root }) => {
    return db.customer
      .findUnique({ where: { id: root?.id } })
      .customerToUserChats()
  },
  customerNotes: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).customerNotes()
  },
  callNotes: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).callNotes()
  },
  customerToUserChatNotes: (_obj, { root }) => {
    return db.customer
      .findUnique({ where: { id: root?.id } })
      .customerToUserChatNotes()
  },
  emailNotes: (_obj, { root }) => {
    return db.customer.findUnique({ where: { id: root?.id } }).emailNotes()
  },
}
