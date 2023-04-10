import type {
  QueryResolvers,
  MutationResolvers,
  EscalationNoteRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const escalationNotes: QueryResolvers['escalationNotes'] = () => {
  return db.escalationNote.findMany()
}

export const escalationNote: QueryResolvers['escalationNote'] = ({ id }) => {
  return db.escalationNote.findUnique({
    where: { id },
  })
}

export const createEscalationNote: MutationResolvers['createEscalationNote'] =
  ({ input }) => {
    return db.escalationNote.create({
      data: input,
    })
  }

export const updateEscalationNote: MutationResolvers['updateEscalationNote'] =
  ({ id, input }) => {
    return db.escalationNote.update({
      data: input,
      where: { id },
    })
  }

export const deleteEscalationNote: MutationResolvers['deleteEscalationNote'] =
  ({ id }) => {
    return db.escalationNote.delete({
      where: { id },
    })
  }

export const EscalationNote: EscalationNoteRelationResolvers = {
  escalation: (_obj, { root }) => {
    return db.escalationNote
      .findUnique({ where: { id: root?.id } })
      .escalation()
  },
  user: (_obj, { root }) => {
    return db.escalationNote.findUnique({ where: { id: root?.id } }).user()
  },
}
