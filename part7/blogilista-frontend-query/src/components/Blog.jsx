import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { useNotificationDispatch } from "../NotificationContext";
import { useUserValue } from "../UserContext";

import blogService from "../services/blogs";
import Spacer from "./Spacer";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const queryKey = ["blogs"];
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");

  const showDeleteButton = user?.username === blog.user.username;

  const blogStyle = {
    backgroundColor: "lightcyan",
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    paddingInline: 20,
  };

  const likeBlogMutation = useMutation({
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

  const commentBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (commentedBlog) => {
      queryClient.invalidateQueries({ queryKey });
      notificationDispatch({
        type: "COMMENT_SUCCESS",
        payload: { title: commentedBlog.title },
      });
    },
    onError: (_, blog) => {
      notificationDispatch({
        type: "COMMENT_FAIL",
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
      navigate("/");
    },
    onError: (_, blog) => {
      notificationDispatch({
        type: "DELETE_FAIL",
        payload: { title: blog.title },
      });
    },
  });

  const blogBaseProps = {
    id: blog.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments,
    user: blog.user.id,
  };

  const likeBlog = () => {
    const blogToUpdate = {
      ...blogBaseProps,
      likes: blog.likes + 1,
    };

    likeBlogMutation.mutate(blogToUpdate);
  };

  const commentBlog = () => {
    const blogToUpdate = {
      ...blogBaseProps,
      comments: blog.comments.concat(newComment),
    };

    commentBlogMutation.mutate(blogToUpdate);
  };

  const deleteBlog = () => {
    window.confirm(`Delete ${blog.title}`) && deleteBlogMutation.mutate(blog);
  };

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2>
      <h3>by {blog.author}</h3>

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

      <div>
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

      <div
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "lightblue",
          marginTop: 20,
        }}
      />

      <h3>Comments:</h3>

      <div>
        <TextField
          fullWidth
          size="small"
          label="Comment"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />

        <Spacer />

        <Button
          startIcon={<AddCommentIcon />}
          disabled={!newComment}
          variant="contained"
          onClick={commentBlog}
        >
          Add comment
        </Button>
      </div>

      <List>
        {blog.comments.map((comment, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>

            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Blog;
