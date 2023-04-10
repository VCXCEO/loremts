import type { Prisma, CompanyNote } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CompanyNoteCreateArgs>({
  companyNote: {
    one: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:35:42.634Z',
        company: {
          create: {
            name: 'String2265814',
            industry: 'String',
            domain: 'String8597319',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String2682125',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:35:42.634Z',
          },
        },
        user: {
          create: {
            email: 'String3753423',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        note: 'String',
        updatedAt: '2023-04-03T19:35:42.634Z',
        company: {
          create: {
            name: 'String6495744',
            industry: 'String',
            domain: 'String9917168',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String827915',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:35:42.634Z',
          },
        },
        user: {
          create: {
            email: 'String100486',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CompanyNote, 'companyNote'>
