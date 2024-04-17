"use server";

import { sql } from "@vercel/postgres";

export async function incrementViews(slug: string) {
  await sql`
    INSERT INTO blog_views (slug, count) 
    VALUES (${slug}, 1) 
    ON CONFLICT (slug) 
    DO UPDATE SET count = blog_views.count + 1
  `;
}
