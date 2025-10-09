import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      return state.concat(action.payload);
    },
    addLike(state, action) {
      return state.map((s) =>
        s.id === action.payload.id
          ? { ...action.payload, likes: action.payload.likes + 1 }
          : s,
      );
    },
    removeBlog(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
    setBlogs(_, action) {
      return action.payload;
    },
  },
});

export const { createBlog, addLike, removeBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);

    const newBlogWithUserData = {
      ...newBlog,
      user: { username: user.username, name: user.name },
    };

    dispatch(createBlog(newBlogWithUserData));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    const updatedBlog = await blogService.update(blog.id, blogToUpdate);

    dispatch(addLike({ ...updatedBlog, user: blog.user }));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export default blogSlice.reducer;
