"use server";
import { sql } from "@vercel/postgres";

interface CommunityPost {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  author_id: number;
  author_name: string;
  author_email: string;
  author_image: string;
  topic_id: number;
  topic_name: string;
}

interface Topic {
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
    SELECT slug, count
    FROM blog_views
  `;

  return result.rows as { slug: string; count: number }[];
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const result = await sql`
    SELECT CommunityPosts.*, Authors.id AS author_id, Authors.name AS author_name, Authors.email AS author_email, Authors.image AS author_image, Topics.id AS topic_id, Topics.name AS topic_name
    FROM CommunityPosts 
    INNER JOIN Authors ON CommunityPosts.author_id = Authors.id
    INNER JOIN Topics ON CommunityPosts.topic_id = Topics.id
    ORDER BY CommunityPosts.created_at DESC;
  `;

  return result.rows as CommunityPost[];
}

export async function getCommunityTopics(): Promise<Topic[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }
  const result = await sql`
    SELECT *
    FROM Topics
  `;

  return result.rows as Topic[];
}
