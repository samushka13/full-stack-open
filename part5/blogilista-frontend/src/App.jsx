import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ text: '', isError: false })

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const showMessage = (text, isError) => {
    setMessage({ text, isError: isError ?? false })
    setTimeout(() => setMessage({ text: '', isError: false }), 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      showMessage('Invalid credentials!', true)
    }
  }

  const handleLogout = async () => {
    try {
      blogService.setToken('')
      window.localStorage.removeItem('loggedInUser')
      setUser(null)
      showMessage('Logout successful!')
    } catch {
      showMessage('Logout failed!', true)
    }
  }

  const addBlog = async (title, author, url) => {
    try {
      await blogService
        .create({ title, author, url })
        .then((b) => setBlogs((prev) => prev.concat({
          ...b,
          user: { username: user.username, name: user.name }
        })))

      showMessage(`"${title}" added!`)
    } catch {
      showMessage(`Adding "${title}" failed!`, true)
    }
  }

  const likeBlog = async (blog) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await blogService
        .update(blog.id, blogToUpdate)
        .then(() => setBlogs((prev) => prev.map((b) => b.id === blog.id ? updatedBlog : b)))

      showMessage(`"${blog.title}" liked!`)
    } catch {
      showMessage(`Liking "${blog.title}" failed!`, true)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService
        .remove(blog.id)
        .then(() => setBlogs((prev) => prev.filter((b) => b.id !== blog.id)))

      showMessage(`"${blog.title}" deleted!`)
    } catch {
      showMessage(`Deleting "${blog.title}" failed!`, true)
    }
  }

  useEffect(() => {
    blogService.getAll().then(setBlogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (!user) {
    return (
      <>
        <h1>Welcome to the Bloglist!</h1>

        <Togglable labelWhenNotVisible={'Login'}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      </>
    )
  }

  return (
    <div>
      {message.text && <Notification message={message} />}

      <h1>Welcome to the Bloglist, {user.name ?? user.username}!</h1>

      <div>
        <p>{user.name} is logged in</p>
        <button type="submit" onClick={handleLogout}>Logout</button>

        <h2>Current blogs</h2>

        {sortedBlogs.map((b) =>
          <Blog
            key={b.id}
            blog={b}
            username={user.username}
            onDelete={() => deleteBlog(b)}
            onLike={() => likeBlog(b)}
          />
        )}

        <Togglable labelWhenNotVisible={'Add blog'}>
          <BlogForm onSubmit={addBlog} />
        </Togglable>
      </div>
    </div>
  )
}

export default App