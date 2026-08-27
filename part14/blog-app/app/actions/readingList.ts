"use server";

import { revalidatePath } from "next/cache";
import {
  addToReadingList,
  markAsRead,
  markAsUnread,
  removeFromReadingList,
} from "../services/readingList";

export const addBlogToReadingList = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await addToReadingList(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/me");
};

export const removeBlogFromReadingList = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await removeFromReadingList(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/me");
};

export const markBlogAsRead = async (readingListItemId: number) => {
  await markAsRead(readingListItemId);

  revalidatePath("/me");
};

export const markBlogAsUnread = async (readingListItemId: number) => {
  await markAsUnread(readingListItemId);

  revalidatePath("/me");
};
