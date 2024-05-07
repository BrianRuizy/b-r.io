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
  let clerkUserId = formData.get("clerk_user_id") as string;
  let topicId = formData.get("topic_id") as string;
  let content = formData.get("content") as string;

  await sql`
    INSERT INTO community_posts (content, topic_id, clerk_user_id)
    VALUES (${content}, ${topicId}, ${clerkUserId})
  `;

  revalidatePath("/community/[topic]", "page");
}

export async function saveReply(formData: FormData) {
  let clerkUserId = formData.get("clerk_user_id") as string;
  let postId = formData.get("post_id") as string;
  let content = formData.get("content") as string;

  await sql`
    INSERT INTO replies (content, post_id, clerk_user_id)
    VALUES (${content}, ${postId}, ${clerkUserId})
  `;

  revalidatePath("/community");
}
