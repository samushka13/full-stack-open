import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";

import { useNotificationDispatch } from "../NotificationContext";
import { useUserValue } from "../UserContext";
import blogService from "../services/blogs";

import Spacer from "./Spacer";

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
      <h3 style={{ paddingLeft: 5 }}>Add a new blog</h3>

      <form onSubmit={addBlog}>
        <div>
          <TextField
            fullWidth
            size="small"
            label="Title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>

        <Spacer />

        <div>
          <TextField
            fullWidth
            size="small"
            label="Author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>

        <Spacer />

        <div>
          <TextField
            fullWidth
            size="small"
            label="URL"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>

        <Spacer />

        <div>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
