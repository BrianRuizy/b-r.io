"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";

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

export async function getCommunityPosts(): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const result = await sql`
    SELECT community_posts.*, Topics.name AS topic_name
    FROM community_posts
    JOIN Topics ON community_posts.topic_id = Topics.id
    ORDER BY community_posts.created_at DESC
    LIMIT 100;
  `;

  const postsWithUserData = await mapUserDataToPosts(result.rows);
  return postsWithUserData;
}

export async function getCommunityPostsForTopic(
  topic: string,
): Promise<CommunityPostProps[]> {
  if (!process.env.POSTGRES_URL) {
    return [];
  }

  const result = await sql`
    SELECT community_posts.*, Topics.name AS topic_name
    FROM community_posts
    JOIN Topics ON community_posts.topic_id = Topics.id
    WHERE Topics.name = ${topic}
    ORDER BY community_posts.created_at DESC
    LIMIT 100;
  `;

  const postsWithUserData = await mapUserDataToPosts(result.rows);
  return postsWithUserData;
}

async function mapUserDataToPosts(posts: any[]): Promise<CommunityPostProps[]> {
  const userIds = [...new Set(posts.map(post => post.clerk_user_id))];
  
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
