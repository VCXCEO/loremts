import type {
  QueryResolvers,
  MutationResolvers,
  EscalationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const escalations: QueryResolvers['escalations'] = () => {
  return db.escalation.findMany()
}

export const escalation: QueryResolvers['escalation'] = ({ id }) => {
  return db.escalation.findUnique({
    where: { id },
  })
}

export const createEscalation: MutationResolvers['createEscalation'] = ({
  input,
}) => {
  return db.escalation.create({
    data: input,
  })
}

export const updateEscalation: MutationResolvers['updateEscalation'] = ({
  id,
  input,
}) => {
  return db.escalation.update({
    data: input,
    where: { id },
  })
}

export const deleteEscalation: MutationResolvers['deleteEscalation'] = ({
  id,
}) => {
  return db.escalation.delete({
    where: { id },
  })
}

export const Escalation: EscalationRelationResolvers = {
  customer: (_obj, { root }) => {
    return db.escalation.findUnique({ where: { id: root?.id } }).customer()
  },
  company: (_obj, { root }) => {
    return db.escalation.findUnique({ where: { id: root?.id } }).company()
  },
  escalationNotes: (_obj, { root }) => {
    return db.escalation
      .findUnique({ where: { id: root?.id } })
      .escalationNotes()
  },
}
