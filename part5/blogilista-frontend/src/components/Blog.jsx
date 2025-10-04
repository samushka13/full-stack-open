import { useState } from 'react'

const Blog = ({ username, blog, onLike, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false)

  const showDeleteButton = username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  const onDeleteClick = () => window.confirm(`Delete ${blog.title}`) && onDelete(blog)

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}

      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'View'}</button>

      {isVisible &&
        <>
          <p>Url: <a href={blog.url} target="_blank">{blog.url}</a></p>

          <p>
            Likes: {blog.likes}
            <button onClick={onLike}>Like</button>
          </p>

          <p>Added by: {blog.user.name ?? blog.user.username}</p>

          {showDeleteButton && <button onClick={onDeleteClick}>Delete</button>}
        </>
      }
    </div>
  )}

export default Blog
