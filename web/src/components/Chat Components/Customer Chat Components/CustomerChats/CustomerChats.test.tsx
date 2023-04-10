import { render } from '@redwoodjs/testing/web'

import CustomerChats from './CustomerChats'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CustomerChats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomerChats />)
    }).not.toThrow()
  })
})
