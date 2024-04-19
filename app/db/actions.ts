"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function incrementViews(slug: string) {
  if (process.env.NODE_ENV === "development") return;

  await sql`
    INSERT INTO blog_views (slug, count) 
    VALUES (${slug}, 1) 
    ON CONFLICT (slug) 
    DO UPDATE SET count = blog_views.count + 1
  `;
}

export async function saveCommunityPost(formData: FormData) {
  let authorID = formData.get("author_id") as string;
  let topicId = formData.get("topic_id") as string;
  let content = formData.get("content") as string;

  await sql`
    INSERT INTO CommunityPosts (content, topic_id, author_id)
    VALUES (${content}, ${topicId}, ${authorID})
  `;

  revalidatePath("/community/[topic]", "page");
}
