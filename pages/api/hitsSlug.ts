import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;
    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
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
      return res
        .status(201)
        .json({ Created: `Created new post with slug '${newPost.slug}'` });
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
      return res.status(200).json({ Views: updatedPost.views });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
