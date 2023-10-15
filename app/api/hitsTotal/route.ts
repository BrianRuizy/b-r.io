import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // get total views
    const total = await prisma.post.aggregate({
      _sum: {
        views: true,
      },
    });

    return Response.json({ total: total._sum.views });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
}
