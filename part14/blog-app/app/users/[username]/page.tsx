import { getUserWithBlogs } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {user.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700">Username:</span> @
            {user.username}
          </p>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Blogs</h3>

            <ul className="space-y-2">
              {user.blogs.map((blog) => (
                <li key={blog.id}>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="group flex items-center justify-between rounded-lg px-4 py-3 transition-colors hover:bg-indigo-50"
                  >
                    <span className="font-medium text-slate-900 group-hover:text-indigo-700">
                      {blog.title}
                    </span>

                    <span className="ml-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
