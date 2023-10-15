import { PrismaClient } from "@prisma/client";
import { type NextRequest } from 'next/server'

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Please provide a slug", { status: 200 });
    }

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
      return new Response(`Created new post with slug '${newPost.slug}'`, {
        status: 201,
      }); 
    }

    if (post) {
      const updatedPost = await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          views: post.views + 1,
        },
      });
      return new Response(JSON.stringify({ Views: updatedPost.views }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
          }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
