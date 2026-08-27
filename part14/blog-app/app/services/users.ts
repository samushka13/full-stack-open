import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getUserById = async (id: number) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
};

export const getUserWithBlogs = async (username: string) => {
  return await db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true, readingList: { with: { blog: true } } },
  });
};

export const updateToken = async (id: number, token: string) => {
  return await db.update(users).set({ token }).where(eq(users.id, id));
};
