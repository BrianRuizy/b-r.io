import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      SELECT CommunityPosts.*, Authors.id AS author_id, Authors.name AS author_name, Authors.email AS author_email, Authors.image AS author_image, Topics.id AS topic_id, Topics.name AS topic_name
      FROM CommunityPosts 
      INNER JOIN Authors ON CommunityPosts.author_id = Authors.id
      INNER JOIN Topics ON CommunityPosts.topic_id = Topics.id
      ORDER BY CommunityPosts.created_at DESC;
  `;
    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
