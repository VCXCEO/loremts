import crypto from 'crypto'

import type {
  QueryResolvers,
  MutationResolvers,
  CompanyRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

function generateRandomString(length = 16) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const buffer = crypto.randomBytes(length)
  let randomString = ''

  for (let i = 0; i < length; i++) {
    randomString +=
      characters[Math.floor((buffer[i] / 256) * characters.length)]
  }

  return randomString
}

export const companies: QueryResolvers['companies'] = () => {
  return db.company.findMany()
}

export const company: QueryResolvers['company'] = ({ id }) => {
  return db.company.findUnique({
    where: { id },
  })
}

export const createCompany: MutationResolvers['createCompany'] = ({
  input,
}) => {
  const apiKey = generateRandomString(32)
  const chatIdentifier = generateRandomString(16)

  return db.company.create({
    data: {
      ...input,
      apiKey,
      chatIdentifier,
    },
  })
}

export const updateCompany: MutationResolvers['updateCompany'] = ({
  id,
  input,
}) => {
  return db.company.update({
    data: input,
    where: { id },
  })
}

export const deleteCompany: MutationResolvers['deleteCompany'] = ({ id }) => {
  return db.company.delete({
    where: { id },
  })
}

export const Company: CompanyRelationResolvers = {
  users: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).users()
  },
  calls: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).calls()
  },
  emails: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).emails()
  },
  escalations: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).escalations()
  },
  userToUserChats: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).userToUserChats()
  },
  customerToUserChats: (_obj, { root }) => {
    return db.company
      .findUnique({ where: { id: root?.id } })
      .customerToUserChats()
  },
  customers: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).customers()
  },
  companyNotes: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).companyNotes()
  },
  companyBillings: (_obj, { root }) => {
    return db.company.findUnique({ where: { id: root?.id } }).companyBillings()
  },
}
