import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/api/getLike/:postId", async (c) => {
  const { postId } = c.req.param();
  const count = await prisma.like.count({
    where: {
      postId: postId,
    },
  });
  return c.json({ count });
});

export async function GET(req: Request) {
  return app.fetch(req);
}
