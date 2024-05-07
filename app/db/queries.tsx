"use server";
import { sql } from "@vercel/postgres";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface UserData {
  imageUrl: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
}

export interface CommunityPostProps {
  id: number;
  content: string;
  clerk_user_id: number;
  created_at: Date;
  topic_id: number;
  topic_name: string;
  user: UserData;
  reply_count: number;
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

export async function getCommunityTopics(): Promise<TopicProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }
  const result = await sql`
    SELECT * FROM Topics
    ORDER BY Topics.name ASC;
  `;

  return result.rows as TopicProps[];
}

export async function getCommunityPosts(
  topic?: string,
): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  revalidatePath("/community/[topic]", "page");
  let result;

  if (topic) {
    result = await sql`
      SELECT community_posts.*, Topics.name AS topic_name, COUNT(replies.id) AS reply_count
      FROM community_posts
      JOIN Topics ON community_posts.topic_id = Topics.id
      LEFT JOIN replies ON community_posts.id = replies.post_id
      WHERE Topics.name = ${topic}
      GROUP BY community_posts.id, Topics.name
      ORDER BY community_posts.created_at DESC
      LIMIT 75;
    `;
  } else {
    result = await sql`
      SELECT community_posts.*, Topics.name AS topic_name, COUNT(replies.id) AS reply_count
      FROM community_posts
      JOIN Topics ON community_posts.topic_id = Topics.id
      LEFT JOIN replies ON community_posts.id = replies.post_id
      GROUP BY community_posts.id, Topics.name
      ORDER BY community_posts.created_at DESC
      LIMIT 75;
    `;
  }

  const postsWithUserData = await mapUserDataToPosts(result.rows);
  return postsWithUserData;
}

async function mapUserDataToPosts(posts: any[]): Promise<CommunityPostProps[]> {
  const userIds = [...new Set(posts.map((post) => post.clerk_user_id))];

  const response = await clerkClient.users.getUserList({
    userId: userIds,
    limit: 100,
  });

  const userMap = response.reduce((acc: { [key: string]: UserData }, user) => {
    acc[user.id] = {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };
    return acc;
  }, {});

  const postsWithUserData = posts.map((post) => {
    const userData = userMap[post.clerk_user_id];
    if (userData) {
      return { ...post, user: userData };
    } else {
      return post;
    }
  });

  return postsWithUserData as CommunityPostProps[];
}

export async function getReplies(
  postId: number,
): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  revalidatePath("/community");

  const result = await sql`
    SELECT * FROM replies WHERE post_id = ${postId} 
    ORDER BY created_at ASC;
  `;

  const postsWithUserData = await mapUserDataToPosts(result.rows);
  return postsWithUserData;
}
