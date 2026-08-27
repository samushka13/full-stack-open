"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "../services/blogs";

export const createBlog = async (
  prevState: {
    errors: { [key: string]: string };
    values?: { title: string; author: string; url: string };
    success?: boolean;
  },
  formData: FormData,
) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: { [key: string]: string } = {};

  if (!title || title.length < 5) {
    errors.title = "The blog's title must include at least 5 characters";
  }

  if (!author || author.length < 5) {
    errors.author = "The blog's author must include at least 5 characters";
  }

  if (!url || url.length < 5) {
    errors.url = "The blog's URL must include at least 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  return { errors: {}, success: true };
};

export const addLikeToBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await likeBlog(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
