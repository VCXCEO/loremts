import { render } from '@redwoodjs/testing/web'

import MagicBell from './MagicBell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MagicBell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MagicBell />)
    }).not.toThrow()
  })
})
