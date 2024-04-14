import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      SELECT CommunityPosts.*, Authors.name, Authors.email, Authors.image 
      FROM CommunityPosts 
      INNER JOIN Authors ON CommunityPosts.author_id = Authors.id;
    `;
    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}