import type {
  QueryResolvers,
  MutationResolvers,
  CompanyBillingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const companyBillings: QueryResolvers['companyBillings'] = () => {
  return db.companyBilling.findMany()
}

export const companyBilling: QueryResolvers['companyBilling'] = ({ id }) => {
  return db.companyBilling.findUnique({
    where: { id },
  })
}

export const createCompanyBilling: MutationResolvers['createCompanyBilling'] =
  ({ input }) => {
    return db.companyBilling.create({
      data: input,
    })
  }

export const updateCompanyBilling: MutationResolvers['updateCompanyBilling'] =
  ({ id, input }) => {
    return db.companyBilling.update({
      data: input,
      where: { id },
    })
  }

export const deleteCompanyBilling: MutationResolvers['deleteCompanyBilling'] =
  ({ id }) => {
    return db.companyBilling.delete({
      where: { id },
    })
  }

export const CompanyBilling: CompanyBillingRelationResolvers = {
  company: (_obj, { root }) => {
    return db.companyBilling.findUnique({ where: { id: root?.id } }).company()
  },
}
