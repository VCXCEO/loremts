import type { Prisma, Escalation } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.EscalationCreateArgs>({
  escalation: {
    one: {
      data: {
        type: 'String',
        record: 'String',
        reason: 'String',
        updatedAt: '2023-04-03T20:12:10.125Z',
        company: {
          create: {
            name: 'String1898791',
            industry: 'String',
            domain: 'String5578436',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String432865',
            apiKey: 'String',
            updatedAt: '2023-04-03T20:12:10.125Z',
          },
        },
      },
    },
    two: {
      data: {
        type: 'String',
        record: 'String',
        reason: 'String',
        updatedAt: '2023-04-03T20:12:10.125Z',
        company: {
          create: {
            name: 'String7027619',
            industry: 'String',
            domain: 'String5340172',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String2563777',
            apiKey: 'String',
            updatedAt: '2023-04-03T20:12:10.125Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Escalation, 'escalation'>
