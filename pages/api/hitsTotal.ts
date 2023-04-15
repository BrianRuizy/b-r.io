import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get total views
    const total = await prisma.post.aggregate({
      _sum: {
        views: true,
      },
    });

    return res.status(200).json({ total: total._sum.views });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}