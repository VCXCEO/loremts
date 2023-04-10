import type { Prisma, CompanyBilling } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CompanyBillingCreateArgs>({
  companyBilling: {
    one: {
      data: {
        billingPeriodStart: '2023-04-03T19:35:52.995Z',
        billingPeriodEnd: '2023-04-03T19:35:52.995Z',
        billingAmount: 9619799,
        renewalDate: '2023-04-03T19:35:52.995Z',
        renewalFrequency: 'String',
        updatedAt: '2023-04-03T19:35:52.995Z',
        company: {
          create: {
            name: 'String2486769',
            industry: 'String',
            domain: 'String2977016',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String6527021',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:35:52.995Z',
          },
        },
      },
    },
    two: {
      data: {
        billingPeriodStart: '2023-04-03T19:35:52.995Z',
        billingPeriodEnd: '2023-04-03T19:35:52.995Z',
        billingAmount: 9229149,
        renewalDate: '2023-04-03T19:35:52.995Z',
        renewalFrequency: 'String',
        updatedAt: '2023-04-03T19:35:52.995Z',
        company: {
          create: {
            name: 'String4838436',
            industry: 'String',
            domain: 'String2037087',
            companyLogo: 'String',
            emailAddress: 'String',
            phoneNumber: 'String',
            chatIdentifier: 'String9136569',
            apiKey: 'String',
            updatedAt: '2023-04-03T19:35:52.995Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CompanyBilling, 'companyBilling'>
