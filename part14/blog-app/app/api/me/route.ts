import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const UNAUTHORIZED = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 },
);

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return UNAUTHORIZED;
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    return UNAUTHORIZED;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
    with: { blogs: true, readingList: { with: { blog: true } } },
  });

  if (!user) {
    return UNAUTHORIZED;
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    blogs: user.blogs,
  });
}
