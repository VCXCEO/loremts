import { render } from '@redwoodjs/testing/web'

import CustomerInfo from './CustomerInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomerInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerInfo />)
    }).not.toThrow()
  })
})
