"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export interface CommunityPostProps {
  id: number;
  content: string;
  clerk_user_id: number;
  created_at: Date;
  topic_id: number;
  topic_name: string;
}

export interface TopicProps {
  id: number;
  name: string;
}

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

export async function getCommunityPosts(): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  revalidatePath("/community", "page");

  const result = await sql`
    SELECT community_posts.*, Topics.name AS topic_name
    FROM community_posts
    JOIN Topics ON community_posts.topic_id = Topics.id
    ORDER BY community_posts.created_at DESC;
`;

  // for each post use clerk_user_id to get user info and add to post

  return result.rows as CommunityPostProps[];
}

export async function getCommunityPostsForTopic(
  topic: string,
): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  revalidatePath("/community/[topic]", "page");
  const result = await sql`
    SELECT community_posts.*, Topics.name AS topic_name
    FROM community_posts
    JOIN Topics ON community_posts.topic_id = Topics.id
    WHERE Topics.name = ${topic}
    ORDER BY community_posts.created_at DESC;
  `;

  return result.rows as CommunityPostProps[];
}

export async function getCommunityTopics(): Promise<TopicProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }
  const result = await sql`
    SELECT * FROM Topics;
  `;

  return result.rows as TopicProps[];
}
