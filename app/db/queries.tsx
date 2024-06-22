"use server";
import { sql } from "@vercel/postgres";

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const result = await sql`
    SELECT slug, count FROM blog_views;
  `;

  return result.rows as { slug: string; count: number }[];
}
