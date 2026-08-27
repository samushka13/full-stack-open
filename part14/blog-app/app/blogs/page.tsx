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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
        Blogs
      </h2>

      <form method="GET" className="mb-6 flex gap-2">
        <input
          data-testid="filter-input"
          type="text"
          name="filter"
          placeholder="Filter by title"
          defaultValue={filter}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />

        <button
          data-testid="search-button"
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:scale-[0.98]"
        >
          Search
        </button>
      </form>

      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="group flex items-center justify-between rounded-lg bg-white px-4 py-4 transition-colors hover:bg-indigo-50"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900 group-hover:text-indigo-700">
                  {blog.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {blog.author} · {blog.likes} likes
                </p>

                <p className="mt-1 truncate text-sm text-indigo-600">
                  {blog.url}
                </p>
              </div>

              <span className="ml-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
