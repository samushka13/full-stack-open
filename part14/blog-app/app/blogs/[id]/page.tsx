import { notFound } from "next/navigation";
import { addLikeToBlog } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { getUserById, getUserWithBlogs } from "@/app/services/users";
import { addBlogToReadingList } from "@/app/actions/readingList";
import { isOnReadingList } from "@/app/services/readingList";
import { auth } from "@/auth";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const session = await auth();
  const user = session?.user?.email
    ? await getUserWithBlogs(session.user?.email)
    : undefined;
  const adderUser = await getUserById(blog.userId);
  const isOnTheList = await isOnReadingList(blog.id);

  const showReadingListButton =
    user?.id !== undefined && blog.userId !== user.id;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {blog.title}
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <p>
              <span className="font-medium text-slate-700">Author:</span>{" "}
              {blog.author}
            </p>

            <p>
              <span className="font-medium text-slate-700">URL:</span>{" "}
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {blog.url}
              </a>
            </p>

            <p>
              <span className="font-medium text-slate-700">Likes:</span>{" "}
              {blog.likes}
            </p>

            {adderUser && (
              <p>
                <span className="font-medium text-slate-700">Added by:</span>{" "}
                <a
                  href={`/users/${adderUser.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {adderUser.name}
                </a>
              </p>
            )}
          </div>

          <form action={addLikeToBlog} className="mt-6">
            <input type="hidden" name="id" value={blog.id} />

            <button
              type="submit"
              className="group rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
            >
              <span className="inline-block transition-transform group-hover:scale-110">
                ♥
              </span>
              <span className="ml-2">Like</span>
            </button>
          </form>

          {showReadingListButton && (
            <form action={addBlogToReadingList} className="mt-6">
              <input type="hidden" name="id" value={blog.id} />

              <button
                type="submit"
                className="group rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
              >
                {isOnTheList
                  ? "Remove from Reading List"
                  : "Add to Reading List"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
