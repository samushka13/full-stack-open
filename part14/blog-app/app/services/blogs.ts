import { asc, eq, ilike } from "drizzle-orm";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
      orderBy: asc(blogs.title),
    });
  }

  return await db.query.blogs.findMany();
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes: number,
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  return await db
    .insert(blogs)
    .values({ title, author, url, likes, userId: user.id })
    .returning();
};

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id) });
};

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id);

  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};
