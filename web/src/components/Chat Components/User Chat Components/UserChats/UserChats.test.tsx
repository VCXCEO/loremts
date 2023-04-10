import { render } from '@redwoodjs/testing/web'

import UserChats from './UserChats'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserChats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserChats />)
    }).not.toThrow()
  })
})
