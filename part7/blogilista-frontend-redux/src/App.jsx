import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import {
  handleLogin,
  handleLogout,
  handleUserLoginStatusCheck,
} from "./reducers/userReducer";
import {
  initializeBlogs,
  addBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { showNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = async (event) => {
    event.preventDefault();

    try {
      await dispatch(handleLogin(username, password)).unwrap();
      setUsername("");
      setPassword("");
    } catch {
      dispatch(
        showNotification({
          text: "Invalid credentials!",
          isError: true,
        }),
      );
    }
  };

  const handleUserLogout = async () => {
    try {
      await dispatch(handleLogout()).unwrap();
      dispatch(showNotification({ text: "Logout successful!" }));
    } catch {
      dispatch(
        showNotification({
          text: "Logout failed!",
          isError: true,
        }),
      );
    }
  };

  const handleAddBlog = async (title, author, url) => {
    try {
      await dispatch(addBlog({ title, author, url }, user)).unwrap();
      dispatch(showNotification({ text: `"${title}" added!` }));
    } catch {
      dispatch(
        showNotification({
          text: `Adding "${title}" failed!`,
          isError: true,
        }),
      );
    }
  };

  const handleLikeBlog = async (blog) => {
    try {
      await dispatch(likeBlog(blog)).unwrap();
      dispatch(showNotification({ text: `"${blog.title}" liked!` }));
    } catch {
      dispatch(
        showNotification({
          text: `Liking "${blog.title}" failed!`,
          isError: true,
        }),
      );
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await dispatch(deleteBlog(blog.id)).unwrap();
      dispatch(showNotification({ text: `"${blog.title}" deleted!` }));
    } catch {
      dispatch(
        showNotification({
          text: `Deleting "${blog.title}" failed!`,
          isError: true,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(handleUserLoginStatusCheck());
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (!user) {
    return (
      <>
        <h1>Welcome to the Bloglist!</h1>

        <Togglable labelWhenNotVisible={"Login"}>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleUserLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </Togglable>
      </>
    );
  }

  return (
    <div>
      <Notification />

      <h1>Welcome to the Bloglist, {user.name ?? user.username}!</h1>

      <div>
        <p>{user.name} is logged in</p>
        <button type="submit" onClick={handleUserLogout}>
          Logout
        </button>

        <h2>Current blogs</h2>

        {sortedBlogs.map((b) => (
          <Blog
            key={b.id}
            blog={b}
            username={user.username}
            onDelete={() => handleDeleteBlog(b)}
            onLike={() => handleLikeBlog(b)}
          />
        ))}

        <Togglable labelWhenNotVisible={"Add blog"}>
          <BlogForm onSubmit={handleAddBlog} />
        </Togglable>
      </div>
    </div>
  );
};

export default App;
