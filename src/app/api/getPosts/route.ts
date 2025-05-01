import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
const app = new Hono();

app.get("/api/getPosts", async (c) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          not: userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            comment: true,
            like: true,
          },
        },
      },
    });
    return c.json(posts);
  } catch (err) {
    console.error("❌ Fetch Posts Error:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export async function GET(req: Request) {
  return app.fetch(req);
}
