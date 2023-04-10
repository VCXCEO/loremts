import type {
  QueryResolvers,
  MutationResolvers,
  CompanyNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const companyNotes: QueryResolvers['companyNotes'] = () => {
  return db.companyNote.findMany()
}

export const companyNote: QueryResolvers['companyNote'] = ({ id }) => {
  return db.companyNote.findUnique({
    where: { id },
  })
}

export const createCompanyNote: MutationResolvers['createCompanyNote'] = ({
  input,
}) => {
  return db.companyNote.create({
    data: input,
  })
}

export const updateCompanyNote: MutationResolvers['updateCompanyNote'] = ({
  id,
  input,
}) => {
  return db.companyNote.update({
    data: input,
    where: { id },
  })
}

export const deleteCompanyNote: MutationResolvers['deleteCompanyNote'] = ({
  id,
}) => {
  return db.companyNote.delete({
    where: { id },
  })
}

export const CompanyNote: CompanyNoteRelationResolvers = {
  company: (_obj, { root }) => {
    return db.companyNote.findUnique({ where: { id: root?.id } }).company()
  },
  user: (_obj, { root }) => {
    return db.companyNote.findUnique({ where: { id: root?.id } }).user()
  },
}
