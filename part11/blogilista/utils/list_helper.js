const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((b) => b.likes)
  const idx = likes.indexOf(Math.max(...likes))

  return blogs[idx]
}

const getUniqueAuthors = (blogs) => {
  return [...new Set(blogs.map((b) => b.author))]
}

const mostBlogs = (blogs) => {
  const authorsWithBlogs = getUniqueAuthors(blogs).map((a) => ({
    author: a,
    blogs: blogs.filter((b) => a === b.author).length
  }))

  const numbersOfBlogs = authorsWithBlogs.map((a) => a.blogs)
  const idx = numbersOfBlogs.indexOf(Math.max(...numbersOfBlogs))

  return authorsWithBlogs[idx]
}

const mostLikes = (blogs) => {
  const authorsWithLikes = getUniqueAuthors(blogs).map((a) => ({
    author: a,
    likes: totalLikes(blogs.filter((b) => a === b.author))
  }))

  const numbersOfLikes = authorsWithLikes.map((a) => a.likes)
  const idx = numbersOfLikes.indexOf(Math.max(...numbersOfLikes))

  return authorsWithLikes[idx]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
