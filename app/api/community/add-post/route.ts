import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const content = searchParams.get("content");
  const created_by = searchParams.get("created_by");
  const email = searchParams.get("email");

  try {
    if (!content || !created_by || !email)
      throw new Error("Content and Author values required");
    await sql`INSERT INTO CommunityPosts (content, created_by, email, created_at) VALUES (${content}, ${created_by}, ${email}, NOW());`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const posts = await sql`SELECT * FROM CommunityPosts;`;
  return NextResponse.json({ posts }, { status: 200 });
}
