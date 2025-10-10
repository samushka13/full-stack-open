import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import blogService from "../services/blogs";

import Blog from "./Blog";
import BlogForm from "./BlogForm";
import BlogItem from "./BlogItem";
import Togglable from "./Togglable";

const Blogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const blogs = result.data ?? [];
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((u) => u.id === match.params.id) : null;

  if (blog) {
    return <Blog blog={blog} />;
  }

  return (
    <div>
      <h2 style={{ paddingLeft: 5 }}>Blogs</h2>

      <Togglable icon={<AddIcon />} labelWhenNotVisible={"Add blog"}>
        <BlogForm />
      </Togglable>

      <h3 style={{ paddingLeft: 5 }}>Current blogs</h3>

      {result.isPending ? (
        <div>Fetching blogs...</div>
      ) : result.isError ? (
        <div>The anecdote service is unavailable due to server problems</div>
      ) : (
        <>
          {sortedBlogs.map((b) => (
            <BlogItem key={b.id} blog={b} />
          ))}
        </>
      )}
    </div>
  );
};

export default Blogs;
