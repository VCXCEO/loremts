import { render } from '@redwoodjs/testing/web'

import ChatNote from './ChatNote'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChatNote', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChatNote />)
    }).not.toThrow()
  })
})
