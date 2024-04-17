"use server";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const slug = searchParams.get('slug');
  
  try {
    const result = await sql`
      SELECT views FROM BlogViews WHERE slug = ${slug}
    `;
    return NextResponse.json({ views: result.rows[0]?.views || "x" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}