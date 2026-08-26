import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "" } = await searchParams;
  const blogs = await getBlogs(filter);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <form method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Filter by title"
          defaultValue={filter}
        />

        <button type="submit">Search</button>
      </form>

      <ul className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              <h3>{blog.title}</h3>
            </Link>
            <p>Author: {blog.author}</p>
            <p>
              URL:
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
