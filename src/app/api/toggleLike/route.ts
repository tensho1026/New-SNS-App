import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.post("/api/toggleLike", async (c) => {
  const body = await c.req.json();
  const { clerkId, postId } = body;
  const existing = await prisma.like.findFirst({
    where: { authorId: clerkId, postId },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return c.json({ message: "Like Removed" }, 200);
  } else {
    await prisma.like.create({ data: { authorId: clerkId, postId } });
    return c.json({ message: "Like Added" }, 200);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}
