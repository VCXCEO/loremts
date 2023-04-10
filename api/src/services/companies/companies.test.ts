import type { Company } from '@prisma/client'

import {
  companies,
  company,
  createCompany,
  updateCompany,
  deleteCompany,
} from './companies'
import type { StandardScenario } from './companies.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('companies', () => {
  scenario('returns all companies', async (scenario: StandardScenario) => {
    const result = await companies()

    expect(result.length).toEqual(Object.keys(scenario.company).length)
  })

  scenario('returns a single company', async (scenario: StandardScenario) => {
    const result = await company({ id: scenario.company.one.id })

    expect(result).toEqual(scenario.company.one)
  })

  scenario('creates a company', async () => {
    const result = await createCompany({
      input: {
        name: 'String4429651',
        industry: 'String',
        domain: 'String6031653',
        companyLogo: 'String',
        emailAddress: 'String',
        phoneNumber: 'String',
        chatIdentifier: 'String6332661',
        apiKey: 'String',
        updatedAt: '2023-04-03T19:35:27.592Z',
      },
    })

    expect(result.name).toEqual('String4429651')
    expect(result.industry).toEqual('String')
    expect(result.domain).toEqual('String6031653')
    expect(result.companyLogo).toEqual('String')
    expect(result.emailAddress).toEqual('String')
    expect(result.phoneNumber).toEqual('String')
    expect(result.chatIdentifier).toEqual('String6332661')
    expect(result.apiKey).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:35:27.592Z'))
  })

  scenario('updates a company', async (scenario: StandardScenario) => {
    const original = (await company({ id: scenario.company.one.id })) as Company
    const result = await updateCompany({
      id: original.id,
      input: { name: 'String16192102' },
    })

    expect(result.name).toEqual('String16192102')
  })

  scenario('deletes a company', async (scenario: StandardScenario) => {
    const original = (await deleteCompany({
      id: scenario.company.one.id,
    })) as Company
    const result = await company({ id: original.id })

    expect(result).toEqual(null)
  })
})
