import { render } from '@redwoodjs/testing/web'

import ChatList from './ChatList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatList />)
    }).not.toThrow()
  })
})
