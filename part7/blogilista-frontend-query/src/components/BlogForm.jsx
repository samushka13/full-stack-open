import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (prev) =>
        prev.concat({
          ...newBlog,
          user: { username: user.username, name: user.name },
        }),
      );

      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");

      notificationDispatch({
        type: "ADD_SUCCESS",
        payload: { title: newBlog.title },
      });
    },
    onError: (_, variable) => {
      notificationDispatch({
        type: "ADD_FAIL",
        payload: { title: variable.title },
      });
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title: newTitle, author: newAuthor, url: newUrl });
  };

  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:&nbsp;
            <input
              type="text"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Author:&nbsp;
            <input
              type="text"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Url:&nbsp;
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
  );
};

export default BlogForm;
