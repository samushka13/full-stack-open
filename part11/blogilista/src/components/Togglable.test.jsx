import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

const BUTTON_TEXT = 'View'
const TOGGLABLE_TEXT = 'Content'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
      <Togglable labelWhenNotVisible={BUTTON_TEXT}>
        <div>{TOGGLABLE_TEXT}</div>
      </Togglable>
    )
  })

  test('renders "View" button', () => {
    screen.getByText(BUTTON_TEXT)
  })

  test('at start, children are not displayed', () => {
    const element = screen.queryByText(TOGGLABLE_TEXT)
    expect(element).toBeNull()
  })

  test('after clicking "View", children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    const element = screen.getByText(TOGGLABLE_TEXT)
    expect(element).toBeVisible()
  })

  test('clicking "hide" hides content', async () => {
    const user = userEvent.setup()

    const button = screen.getByText(BUTTON_TEXT)
    await user.click(button)

    const closeButton = screen.getByText('Cancel')
    await user.click(closeButton)

    const element = screen.queryByText(TOGGLABLE_TEXT)
    expect(element).toBeNull()
  })
})
