import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const TEST_USER = {
  username: 'test-username',
  name: 'tester'
}

const TEST_BLOG = {
  title: 'Test Title',
  author: 'Test Author',
  url: 'test-url',
  likes: 0,
  user: TEST_USER
}

describe('<Blog />', () => {
  test('renders title', () => {
    render(<Blog blog={TEST_BLOG} username={TEST_USER.username} />)

    const element = screen.getByText(TEST_BLOG.title, { exact: false })
    expect(element).toBeDefined()
  })

  test('renders author', () => {
    render(<Blog blog={TEST_BLOG} username={TEST_USER.username} />)

    const element = screen.getByText(TEST_BLOG.author, { exact: false })
    expect(element).toBeDefined()
  })

  test('clicking the "View" button reveals blog details', async () => {
    render(<Blog blog={TEST_BLOG} username={TEST_USER.username} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const url = screen.getByText(TEST_BLOG.url, { exact: false })
    const likes = screen.getByText(`Likes: ${TEST_BLOG.likes}`)
    const userName = screen.getByText(TEST_BLOG.user.name, { exact: false })

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
    expect(userName).toBeDefined()
  })

  test('clicking the "View" button reveals action buttons', async () => {
    render(<Blog blog={TEST_BLOG} username={TEST_USER.username} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    const deleteButton = screen.getByText('Delete')

    expect(likeButton).toBeDefined()
    expect(deleteButton).toBeDefined()
  })

  test('clicking "like" twice calls event handler twice', async () => {
    const mockHandler = vi.fn()

    render(<Blog blog={TEST_BLOG} username={TEST_USER.username} onLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
