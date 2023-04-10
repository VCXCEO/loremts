import type { Prisma, EscalationNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EscalationNoteCreateArgs>({
  escalationNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T20:12:21.604Z',
        escalation: {
          create: {
            type: 'String',
            record: 'String',
            reason: 'String',
            updatedAt: '2023-04-03T20:12:21.604Z',
            company: {
              create: {
                name: 'String1153270',
                industry: 'String',
                domain: 'String9475344',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String5814270',
                apiKey: 'String',
                updatedAt: '2023-04-03T20:12:21.604Z',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String8218247',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T20:12:21.604Z',
        escalation: {
          create: {
            type: 'String',
            record: 'String',
            reason: 'String',
            updatedAt: '2023-04-03T20:12:21.604Z',
            company: {
              create: {
                name: 'String9937456',
                industry: 'String',
                domain: 'String7499155',
                companyLogo: 'String',
                emailAddress: 'String',
                phoneNumber: 'String',
                chatIdentifier: 'String480396',
                apiKey: 'String',
                updatedAt: '2023-04-03T20:12:21.604Z',
              },
            },
          },
        },
        user: {
          create: {
            email: 'String9831746',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<EscalationNote, 'escalationNote'>
