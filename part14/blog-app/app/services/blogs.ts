type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Blog 1",
    author: "Author 1",
    url: "https://example.com/blog1",
    likes: 10,
  },
  {
    id: 2,
    title: "Blog 2",
    author: "Author 2",
    url: "https://example.com/blog2",
    likes: 20,
  },
  {
    id: 3,
    title: "Blog 3",
    author: "Author 3",
    url: "https://example.com/blog3",
    likes: 30,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  blogs.push({ id: nextId++, title, author, url, likes });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes += 1;
  }
};
