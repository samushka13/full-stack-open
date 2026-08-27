import { db } from "@/db";
import { readingList } from "@/db/schema";
import { getCurrentUser } from "./session";
import { and, eq } from "drizzle-orm";

export const isOnReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (user) {
    const existingEntry = await db.query.readingList.findFirst({
      where: and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId),
      ),
    });

    return !!existingEntry;
  }

  return false;
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (user) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
    });
  }
};

export const removeFromReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (user) {
    await db.delete(readingList).where(eq(readingList.blogId, blogId));
  }
};

export const markAsRead = async (readingListItemId: number) => {
  const user = await getCurrentUser();

  if (user) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(
        and(
          eq(readingList.userId, user.id),
          eq(readingList.id, readingListItemId),
        ),
      );
  }
};

export const markAsUnread = async (readingListItemId: number) => {
  const user = await getCurrentUser();

  if (user) {
    await db
      .update(readingList)
      .set({ read: false })
      .where(
        and(
          eq(readingList.userId, user.id),
          eq(readingList.id, readingListItemId),
        ),
      );
  }
};
