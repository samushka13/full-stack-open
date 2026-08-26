import { asc, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

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
  userId: number,
) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  });

  return await db
    .insert(blogs)
    .values({ title, author, url, likes, userId: user?.id ?? userId })
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
