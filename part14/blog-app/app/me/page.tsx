// import { notFound } from "next/navigation";
// import { getUserWithBlogs } from "@/app/services/users";
// import { auth } from "@/auth";
// import TokenGeneratorButton from "../components/TokenGeneratorButton";
// import Link from "next/link";

// const MePage = async () => {
//   const session = await auth();

//   if (!session || !session.user?.email) {
//     return notFound();
//   }

//   const user = await getUserWithBlogs(session.user?.email);

//   if (!user) {
//     return notFound();
//   }

//   return (
//     <div className="mx-auto max-w-2xl px-4 py-10">
//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
//           <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
//             My profile
//           </h2>
//         </div>

//         <div className="space-y-8 px-6 py-6 sm:px-8">
//           <div>
//             <p className="font-medium text-slate-900">{session.user?.name}</p>
//             <p className="mt-1 text-sm text-slate-500">
//               @{session.user?.email}
//             </p>
//           </div>

//           <div className="border-t border-slate-100 pt-6">
//             <div className="mb-4">
//               <h3 className="font-medium text-slate-900">API token</h3>
//             </div>

//             <div className="rounded-lg bg-slate-50 p-4">
//               {user.token ? (
//                 <code className="block break-all text-sm text-slate-700">
//                   {user.token}
//                 </code>
//               ) : (
//                 <p className="text-sm text-slate-500">
//                   No token has been generated yet.
//                 </p>
//               )}
//             </div>

//             <div className="mt-4">
//               <TokenGeneratorButton />
//             </div>
//           </div>
//         </div>
//       </div>

//       <br />

//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//         <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
//           <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
//             Reading list
//           </h2>
//         </div>

//         <ul className="space-y-2">
//           {user.readingList.map((item) => (
//             <li key={item.id}>
//               <Link
//                 href={`/blogs/${item.blog.id}`}
//                 className="group flex items-center justify-between rounded-lg bg-white px-4 py-4 transition-colors hover:bg-indigo-50"
//               >
//                 <div className="min-w-0">
//                   <p className="font-medium text-slate-900 group-hover:text-indigo-700">
//                     {item.blog.title}
//                   </p>

//                   <p className="mt-1 text-sm text-slate-500">
//                     {item.blog.author} · {item.blog.likes} likes
//                   </p>

//                   <p className="mt-1 truncate text-sm text-indigo-600">
//                     {item.blog.url}
//                   </p>
//                 </div>

//                 <span className="ml-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">
//                   →
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MePage;

import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";
import { auth } from "@/auth";
import TokenGeneratorButton from "../components/TokenGeneratorButton";
import Link from "next/link";
import MarkAsReadButton from "../components/MarkAsReadButton";
import MarkAsUnreadButton from "../components/MarkAsUnreadButton";

const MePage = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    return notFound();
  }

  const user = await getUserWithBlogs(session.user.email);

  if (!user) {
    return notFound();
  }

  const unreadBlogs = user.readingList.filter((item) => !item.read);
  const readBlogs = user.readingList.filter((item) => item.read);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            My profile
          </h2>
        </div>

        <div className="space-y-8 px-6 py-6 sm:px-8">
          <div>
            <p className="font-medium text-slate-900">{session.user?.name}</p>
            <p className="mt-1 text-sm text-slate-500">
              @{session.user?.email}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="mb-4">
              <h3 className="font-medium text-slate-900">API token</h3>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              {user.token ? (
                <code className="block break-all text-sm text-slate-700">
                  {user.token}
                </code>
              ) : (
                <p className="text-sm text-slate-500">
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

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Reading list
          </h2>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <section>
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
              <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No unread blogs.
              </p>
            )}
          </section>

          <section className="mt-8 border-t border-slate-100 pt-6">
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
              <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                No read blogs yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MePage;
