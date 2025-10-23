import { render, screen } from '@testing-library/react'
import Todo from './Todo'

const TEST_TODO = {
  text: 'Test',
  done: false
}

describe('<Todo />', () => {
  test('renders title', () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(<Todo todo={TEST_TODO} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    const element = screen.getByText(TEST_TODO.text)
    expect(element).toBeDefined()
  })
})
