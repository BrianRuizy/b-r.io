import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Create Authors table
    await sql`CREATE TABLE Authors (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image VARCHAR(255)
    );`;

    // Create CommunityPosts table
    await sql`CREATE TABLE CommunityPosts (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      author_id INTEGER REFERENCES Authors(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    // Create Likes table
    await sql`CREATE TABLE Likes (
      id SERIAL PRIMARY KEY,
      post_id INTEGER REFERENCES CommunityPosts(id),
      author_id INTEGER REFERENCES Authors(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    // Create Comments table
    await sql`CREATE TABLE Comments (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL,
      post_id INTEGER REFERENCES CommunityPosts(id),
      author_id INTEGER REFERENCES Authors(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );`;

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}