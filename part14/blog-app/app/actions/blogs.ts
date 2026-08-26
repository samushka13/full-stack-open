"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, likeBlog } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const userId = Number(formData.get("userId"));

  await addBlog(title, author, url, 0, userId);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addLikeToBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await likeBlog(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
