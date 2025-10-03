import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  const style = {
    color: message.isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [message, setMessage] = useState({ text: '', isError: false })
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 

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

  const addBlog = async () => {
    try {
      await blogService.create({ title: newTitle, author: newAuthor, url: newUrl })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      showMessage(`"${newTitle}" added!`)
    } catch {
      showMessage(`Adding "${newTitle}" failed!`, true)
    }
  }

  // const deleteBlog = async (blog) => {
  //   try {
  //     await blogService.remove(blog.id)
  //     showMessage(`"${blog.title}" deleted!`)
  //   } catch {
  //     showMessage(`Deleting "${blog.title}" failed!`, true)
  //   }
  // }

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
      <div>
        <h2>Log in to application</h2>

        {message.text && <Notification message={message} />}

        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome to the Bloglist, {user.name ?? user.username}!</h1>

      {message.text && <Notification message={message} />}

      <div>
        <p>{user.name} is logged in</p>
        <button type="submit" onClick={handleLogout}>Sign Out</button>

        <h2>Current blogs</h2>

        {blogs.map((b) =>
          <Blog key={b.id} blog={b} />
          // <Blog key={b.id} blog={b} onDelete={() => deleteBlog(b)} />
        )}

        <h3>Add a new blog</h3>

        <form onSubmit={addBlog}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={newTitle}
                onChange={({ target }) => setNewTitle(target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Author:
              <input
                type="text"
                value={newAuthor}
                onChange={({ target }) => setNewAuthor(target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Url:
              <input
                type="text"
                value={newUrl}
                onChange={({ target }) => setNewUrl(target.value)}
              />
            </label>
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  )
}

export default App