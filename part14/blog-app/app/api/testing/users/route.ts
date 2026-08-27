import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();

    const { username, name, password } = body;

    if (!username || !name || !password) {
      return NextResponse.json(
        { error: "username, name and password are required" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({ username, name, passwordHash })
      .returning();

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e, details: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
