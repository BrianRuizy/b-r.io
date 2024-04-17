"use server";

import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function incrementViews(slug: string) {
  if (process.env.NODE_ENV === "development") return;

  noStore();
  await sql`
    INSERT INTO blog_views (slug, count) 
    VALUES (${slug}, 1) 
    ON CONFLICT (slug) 
    DO UPDATE SET count = blog_views.count + 1
  `;
}
