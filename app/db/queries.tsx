"use server";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }
  noStore();
  const result = await sql`
    SELECT slug, count
    FROM blog_views
  `;

  return result.rows as { slug: string; count: number }[];
}
