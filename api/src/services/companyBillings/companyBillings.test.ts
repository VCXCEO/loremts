import type { CompanyBilling } from '@prisma/client'

import {
  companyBillings,
  companyBilling,
  createCompanyBilling,
  updateCompanyBilling,
  deleteCompanyBilling,
} from './companyBillings'
import type { StandardScenario } from './companyBillings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('companyBillings', () => {
  scenario(
    'returns all companyBillings',
    async (scenario: StandardScenario) => {
      const result = await companyBillings()

      expect(result.length).toEqual(Object.keys(scenario.companyBilling).length)
    }
  )

  scenario(
    'returns a single companyBilling',
    async (scenario: StandardScenario) => {
      const result = await companyBilling({
        id: scenario.companyBilling.one.id,
      })

      expect(result).toEqual(scenario.companyBilling.one)
    }
  )

  scenario('creates a companyBilling', async (scenario: StandardScenario) => {
    const result = await createCompanyBilling({
      input: {
        billingPeriodStart: '2023-04-03T19:35:52.983Z',
        billingPeriodEnd: '2023-04-03T19:35:52.983Z',
        billingAmount: 7106513,
        renewalDate: '2023-04-03T19:35:52.983Z',
        renewalFrequency: 'String',
        updatedAt: '2023-04-03T19:35:52.983Z',
        companyId: scenario.companyBilling.two.companyId,
      },
    })

    expect(result.billingPeriodStart).toEqual(
      new Date('2023-04-03T19:35:52.983Z')
    )
    expect(result.billingPeriodEnd).toEqual(
      new Date('2023-04-03T19:35:52.983Z')
    )
    expect(result.billingAmount).toEqual(7106513)
    expect(result.renewalDate).toEqual(new Date('2023-04-03T19:35:52.983Z'))
    expect(result.renewalFrequency).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:35:52.983Z'))
    expect(result.companyId).toEqual(scenario.companyBilling.two.companyId)
  })

  scenario('updates a companyBilling', async (scenario: StandardScenario) => {
    const original = (await companyBilling({
      id: scenario.companyBilling.one.id,
    })) as CompanyBilling
    const result = await updateCompanyBilling({
      id: original.id,
      input: { billingPeriodStart: '2023-04-04T19:35:52.983Z' },
    })

    expect(result.billingPeriodStart).toEqual(
      new Date('2023-04-04T19:35:52.983Z')
    )
  })

  scenario('deletes a companyBilling', async (scenario: StandardScenario) => {
    const original = (await deleteCompanyBilling({
      id: scenario.companyBilling.one.id,
    })) as CompanyBilling
    const result = await companyBilling({ id: original.id })

    expect(result).toEqual(null)
  })
})
