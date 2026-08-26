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
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <h2>Create a new blog</h2>

      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              required
              defaultValue={state.values?.title}
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              required
              defaultValue={state.values?.author}
            />
          </label>
        </div>
        <div>
          <label>
            URL
            <input
              type="url"
              name="url"
              required
              defaultValue={state.values?.url}
            />
          </label>
        </div>

        <button type="submit">Create</button>

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
  );
};

export default NewBlog;
