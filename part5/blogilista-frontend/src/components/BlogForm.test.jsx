import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm onSubmit={createBlog} />)

  const input1 = screen.getByLabelText('Title:')
  const input2 = screen.getByLabelText('Author:')
  const input3 = screen.getByLabelText('Url:')
  const sendButton = screen.getByText('Save')

  await user.type(input1, 'test title')
  await user.type(input2, 'test author')
  await user.type(input3, 'test url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe('test title')
  expect(createBlog.mock.calls[0][1]).toBe('test author')
  expect(createBlog.mock.calls[0][2]).toBe('test url')
})
