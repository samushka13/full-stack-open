"use client";

import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const NewBlog = () => {
  const { showNotification } = useNotification();
  const router = useRouter();

  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      showNotification("Blog added!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <form action={formAction} className="space-y-5">
          <h2 className="text-3xl font-bold text-white text-center">
            Add blog
          </h2>

          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            defaultValue={state.values?.title}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="text"
            name="author"
            required
            placeholder="Author"
            defaultValue={state.values?.author}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="url"
            name="url"
            required
            placeholder="URL"
            defaultValue={state.values?.url}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.98]"
          >
            Create
          </button>

          {state.errors && Object.keys(state.errors).length > 0 && (
            <div>
              {Object.values(state.errors).map((error, index) => (
                <p key={index} style={{ color: "red" }}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
