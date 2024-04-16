import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { content, topic_id, author_id } = await request.json();

  if (!content || !topic_id || !author_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const result = await sql`
      INSERT INTO CommunityPosts (content, topic_id, author_id)
      VALUES (${content}, ${topic_id}, ${author_id})
      RETURNING *;
    `;
    return NextResponse.json({ result: result.rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
