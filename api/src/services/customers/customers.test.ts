import type { Customer } from '@prisma/client'

import {
  customers,
  customer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from './customers'
import type { StandardScenario } from './customers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customers', () => {
  scenario('returns all customers', async (scenario: StandardScenario) => {
    const result = await customers()

    expect(result.length).toEqual(Object.keys(scenario.customer).length)
  })

  scenario('returns a single customer', async (scenario: StandardScenario) => {
    const result = await customer({ id: scenario.customer.one.id })

    expect(result).toEqual(scenario.customer.one)
  })

  scenario('creates a customer', async () => {
    const result = await createCustomer({
      input: { transactionId: 'String', updatedAt: '2023-04-03T19:37:00.233Z' },
    })

    expect(result.transactionId).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2023-04-03T19:37:00.233Z'))
  })

  scenario('updates a customer', async (scenario: StandardScenario) => {
    const original = (await customer({
      id: scenario.customer.one.id,
    })) as Customer
    const result = await updateCustomer({
      id: original.id,
      input: { transactionId: 'String2' },
    })

    expect(result.transactionId).toEqual('String2')
  })

  scenario('deletes a customer', async (scenario: StandardScenario) => {
    const original = (await deleteCustomer({
      id: scenario.customer.one.id,
    })) as Customer
    const result = await customer({ id: original.id })

    expect(result).toEqual(null)
  })
})
