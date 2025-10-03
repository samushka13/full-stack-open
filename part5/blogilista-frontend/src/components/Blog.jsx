const Blog = ({ blog, onDelete }) => (
  <div>
    <a href={blog.url}>{blog.title}</a> by {blog.author}
    {onDelete && <button onClick={onDelete}>Delete</button>}
  </div>  
)

export default Blog