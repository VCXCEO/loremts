import type { Prisma, CustomerNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomerNoteCreateArgs>({
  customerNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:28.044Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:28.044Z',
          },
        },
        user: {
          create: {
            email: 'String2109997',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:37:28.044Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:28.044Z',
          },
        },
        user: {
          create: {
            email: 'String380872',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CustomerNote, 'customerNote'>
