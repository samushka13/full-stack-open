"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { users } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/auth";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export const registerUser = async (
  prevState: {
    errors: { [key: string]: string };
    values: {
      username: string;
      name: string;
      password: string;
      confirmPassword: string;
    };
  },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const errors: { [key: string]: string } = {};

  if (!username || username.length < 5) {
    errors.username = "The username must include at least 5 characters";
  }

  if (!password || password.length < 5) {
    errors.password = "The password must include at least 5 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "The passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, confirmPassword } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const updateApiToken = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const token = randomUUID();

  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email));

  revalidatePath("/me");
};
