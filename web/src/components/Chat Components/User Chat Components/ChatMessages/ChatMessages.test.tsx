import { render } from '@redwoodjs/testing/web'

import ChatMessages from './ChatMessages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatMessages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatMessages />)
    }).not.toThrow()
  })
})
