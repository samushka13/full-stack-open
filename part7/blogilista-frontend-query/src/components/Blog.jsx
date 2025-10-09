import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useNotificationDispatch } from "../NotificationContext";
import { useUserValue } from "../UserContext";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const queryKey = ["blogs"];
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState("");

  const showDeleteButton = user?.username === blog.user.username;

  const blogStyle = {
    marginTop: 30,
    paddingLeft: 2,
    marginBottom: 5,
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
      <p>by {blog.author}</p>

      <p>
        Url:&nbsp;
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </p>
      <p>
        Likes: {blog.likes}
        <button onClick={likeBlog}>Like</button>
      </p>
      <p>Added by: {blog.user.name ?? blog.user.username}</p>

      <div>
        {showDeleteButton && <button onClick={deleteBlog}>Delete</button>}
      </div>

      <h3>Comments:</h3>

      <input
        type="text"
        value={newComment}
        onChange={({ target }) => setNewComment(target.value)}
      />

      <button onClick={commentBlog}>Add comment</button>

      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
