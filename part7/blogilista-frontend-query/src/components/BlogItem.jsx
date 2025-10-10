import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useNotificationDispatch } from "../NotificationContext";
import { useUserValue } from "../UserContext";

import blogService from "../services/blogs";

const BlogItem = ({ blog }) => {
  const queryClient = useQueryClient();
  const queryKey = ["blogs"];
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

  const [isVisible, setIsVisible] = useState(false);

  const showDeleteButton = user?.username === blog.user.username;

  const blogStyle = {
    backgroundColor: "lightcyan",
    border: "solid",
    borderColor: "lightblue",
    borderWidth: 1,
    marginBottom: 5,
    padding: 15,
    paddingTop: 0,
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey });
      notificationDispatch({
        type: "LIKE_SUCCESS",
        payload: { title: updatedBlog.title },
      });
    },
    onError: (_, blog) => {
      notificationDispatch({
        type: "LIKE_FAIL",
        payload: { title: blog.title },
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, blog) => {
      queryClient.invalidateQueries({ queryKey });
      notificationDispatch({
        type: "DELETE_SUCCESS",
        payload: { title: blog.title },
      });
    },
    onError: (_, blog) => {
      notificationDispatch({
        type: "DELETE_FAIL",
        payload: { title: blog.title },
      });
    },
  });

  const likeBlog = () => {
    const blogToUpdate = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateBlogMutation.mutate(blogToUpdate);
  };

  const deleteBlog = () => {
    window.confirm(`Delete ${blog.title}`) && deleteBlogMutation.mutate(blog);
  };

  return (
    <Card style={blogStyle}>
      <div>
        <h4>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          &nbsp;by {blog.author}&nbsp;
        </h4>

        <Button
          startIcon={isVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={toggleVisibility}
          variant="contained"
          color="primary"
          type="submit"
        >
          {isVisible ? "Hide" : "View"}
        </Button>
      </div>

      {isVisible && (
        <div>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "lightblue",
              marginTop: 20,
            }}
          />

          <p>
            Url:&nbsp;
            <a href={blog.url} target="_blank">
              {blog.url}
            </a>
          </p>

          <p>Likes: {blog.likes}</p>

          <Button
            startIcon={<ThumbUpIcon />}
            variant="contained"
            color="success"
            onClick={likeBlog}
          >
            Like
          </Button>

          <p>Added by: {blog.user.name ?? blog.user.username}</p>

          {showDeleteButton && (
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="secondary"
              onClick={deleteBlog}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default BlogItem;
