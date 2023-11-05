import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Please provide a slug", { status: 200 });
    }

    let viewCount = 0;

    if (process.env.NODE_ENV !== "development") {
      // Increment the view count in production
      const post = await prisma.post.findUnique({
        where: {
          slug: slug as string,
        },
      });

      if (!post) {
        const newPost = await prisma.post.create({
          data: {
            slug: slug as string,
            views: 1,
          },
        });
        viewCount = newPost.views;
      } else {
        const updatedPost = await prisma.post.update({
          where: {
            id: post.id,
          },
          data: {
            views: post.views + 1,
          },
        });
        viewCount = updatedPost.views;
      }
    } else {
      // Get view count without incrementing in local environment
      const post = await prisma.post.findUnique({
        where: {
          slug: slug as string,
        },
      });

      if (post) {
        viewCount = post.views;
      }
    }

    return new Response(JSON.stringify({ Views: viewCount }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
