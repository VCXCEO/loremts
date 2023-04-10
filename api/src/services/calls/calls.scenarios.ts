import type { Prisma, Call } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CallCreateArgs>({
  call: {
    one: {
      data: {
        callDirection: 'String',
        callDuration: 8843560,
        record: 'String',
        dateReceived: '2023-04-03T19:37:36.651Z',
        tags: 'String',
        updatedAt: '2023-04-03T19:37:36.651Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:36.651Z',
          },
        },
        company: {
          create: {
            name: 'String8240179',
            industry: 'String',
            domain: 'String8016367',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String5689785',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:37:36.651Z',
          },
        },
      },
    },
    two: {
      data: {
        callDirection: 'String',
        callDuration: 1370829,
        record: 'String',
        dateReceived: '2023-04-03T19:37:36.651Z',
        tags: 'String',
        updatedAt: '2023-04-03T19:37:36.651Z',
        customer: {
          create: {
            transactionId: 'String',
            updatedAt: '2023-04-03T19:37:36.651Z',
          },
        },
        company: {
          create: {
            name: 'String9988816',
            industry: 'String',
            domain: 'String1256473',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String1325619',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:37:36.651Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Call, 'call'>
