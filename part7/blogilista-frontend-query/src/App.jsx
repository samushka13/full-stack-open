import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNotificationDispatch } from "./NotificationContext";
import { useUserDispatch, useUserValue } from "./UserContext";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const blogQueryResult = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const blogs = blogQueryResult.data ?? [];
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleLogout = async () => {
    try {
      userDispatch({ type: "LOGOUT" });
      notificationDispatch({ type: "LOGOUT_SUCCESS" });
    } catch {
      notificationDispatch({ type: "LOGOUT_FAIL" });
    }
  };

  useEffect(() => {
    userDispatch({ type: "RESUME_SESSION" });
  }, [userDispatch]);

  if (!user) {
    return (
      <>
        <Notification />

        <h1>Welcome to the Bloglist!</h1>

        <Togglable labelWhenNotVisible={"Login"}>
          <LoginForm />
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
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>

        <h2>Current blogs</h2>

        {blogQueryResult.isPending ? (
          <div>Fetching blogs...</div>
        ) : blogQueryResult.isError ? (
          <div>The anecdote service is unavailable due to server problems</div>
        ) : (
          <>
            {sortedBlogs.map((b) => (
              <Blog key={b.id} blog={b} />
            ))}
          </>
        )}

        <Togglable labelWhenNotVisible={"Add blog"}>
          <BlogForm />
        </Togglable>
      </div>
    </div>
  );
};

export default App;
