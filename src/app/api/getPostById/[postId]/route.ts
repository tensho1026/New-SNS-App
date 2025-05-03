import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/api/getPostById/:postId", async (c) => {
  const { postId } = c.req.param();

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        like: true, 
        comment: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                imageUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            like: true,
            comment: true,
          },
        },
      },
    });

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export async function GET(req: Request) {
  return app.fetch(req);
}
