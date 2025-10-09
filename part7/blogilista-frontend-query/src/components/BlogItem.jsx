import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      &nbsp;by {blog.author}&nbsp;
      <button onClick={toggleVisibility}>{isVisible ? "Hide" : "View"}</button>
      {isVisible && (
        <>
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

          {showDeleteButton && <button onClick={deleteBlog}>Delete</button>}
        </>
      )}
    </div>
  );
};

export default BlogItem;
