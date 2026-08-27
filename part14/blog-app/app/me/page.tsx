"use server";

import { notFound, redirect } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";
import { auth } from "@/auth";
import TokenGeneratorButton from "../components/TokenGeneratorButton";
import Link from "next/link";
import MarkAsReadButton from "../components/MarkAsReadButton";
import MarkAsUnreadButton from "../components/MarkAsUnreadButton";

const MePage = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  const user = await getUserWithBlogs(session.user.email);

  if (!user) {
    redirect("/login");
  }

  const unreadBlogs = user.readingList.filter((item) => !item.read);
  const readBlogs = user.readingList.filter((item) => item.read);

  return (
    <div data-testid="user-profile" className="mx-auto max-w-2xl px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            My profile
          </h2>
        </div>

        <div className="space-y-8 px-6 py-6 sm:px-8">
          <div>
            <p data-testid="user-name" className="font-medium text-slate-900">
              {session.user?.name}
            </p>

            <p
              data-testid="user-username"
              className="mt-1 text-sm text-slate-500"
            >
              @{session.user?.email}
            </p>
          </div>

          <div
            data-testid="api-token-section"
            className="border-t border-slate-100 pt-6"
          >
            <div className="mb-4">
              <h3 className="font-medium text-slate-900">API token</h3>
            </div>

            <div
              data-testid="token-display"
              className="rounded-lg bg-slate-50 p-4"
            >
              {user.token ? (
                <code
                  data-testid="api-token"
                  className="block break-all text-sm text-slate-700"
                >
                  {user.token}
                </code>
              ) : (
                <p
                  data-testid="no-token-message"
                  className="text-sm text-slate-500"
                >
                  No token has been generated yet.
                </p>
              )}
            </div>

            <div className="mt-4">
              <TokenGeneratorButton />
            </div>
          </div>
        </div>
      </div>

      <div
        data-testid="reading-list-section"
        className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Reading list
          </h2>
        </div>

        {user.readingList.length > 0 ? (
          <div className="px-6 py-6 sm:px-8">
            <section data-testid="unread-section">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Unread {"(" + unreadBlogs.length + ")"}
                </h3>
              </div>

              {unreadBlogs.length > 0 ? (
                <ul className="space-y-2">
                  {unreadBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-lg border border-slate-100 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="group min-w-0 flex-1"
                        >
                          <p className="font-medium text-slate-900 group-hover:text-indigo-700">
                            {item.blog.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.blog.author} · {item.blog.likes} likes
                          </p>

                          <p className="mt-1 truncate text-sm text-indigo-600">
                            {item.blog.url}
                          </p>
                        </Link>

                        <MarkAsReadButton readingListItemId={item.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  data-testid="no-unread-blogs"
                  className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500"
                >
                  No unread blogs.
                </p>
              )}
            </section>

            <section
              data-testid="read-section"
              className="mt-8 border-t border-slate-100 pt-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Read {"(" + readBlogs.length + ")"}
                </h3>
              </div>

              {readBlogs.length > 0 ? (
                <ul className="space-y-2">
                  {readBlogs.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-lg border border-slate-100 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="group min-w-0 flex-1"
                        >
                          <p className="font-medium text-slate-900 group-hover:text-indigo-700">
                            {item.blog.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.blog.author} · {item.blog.likes} likes
                          </p>

                          <p className="mt-1 truncate text-sm text-indigo-600">
                            {item.blog.url}
                          </p>
                        </Link>

                        <MarkAsUnreadButton readingListItemId={item.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  data-testid="no-read-blogs"
                  className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500"
                >
                  No read blogs yet.
                </p>
              )}
            </section>
          </div>
        ) : (
          <p
            data-testid="empty-reading-list"
            className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500"
          >
            Add some blogs to your reading list to see them here.
          </p>
        )}
      </div>
    </div>
  );
};

export default MePage;
