import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get("slug");

  try {
    let result;
    if (process.env.NODE_ENV === 'production') {
      result = await sql`
        INSERT INTO BlogViews (slug, views) 
        VALUES (${slug}, 1) 
        ON CONFLICT (slug) 
        DO UPDATE SET views = BlogViews.views + 1
        RETURNING views
      `;
    } else {
      result = await sql`
        SELECT views FROM BlogViews WHERE slug = ${slug}
      `;
    }
    return NextResponse.json({ views: result.rows[0].views }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}