import type { Prisma, Company } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CompanyCreateArgs>({
  company: {
    one: {
      data: {
        name: 'String61680',
        industry: 'String',
        domain: 'String1821602',
        companyLogo: 'String',
        emailAddress: 'String',
        phoneNumber: 'String',
        chatIdentifier: 'String2933218',
        apiKey: 'String',
        updatedAt: '2023-04-03T19:35:27.603Z',
      },
    },
    two: {
      data: {
        name: 'String4725118',
        industry: 'String',
        domain: 'String5131507',
        companyLogo: 'String',
        emailAddress: 'String',
        phoneNumber: 'String',
        chatIdentifier: 'String7195080',
        apiKey: 'String',
        updatedAt: '2023-04-03T19:35:27.603Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Company, 'company'>
