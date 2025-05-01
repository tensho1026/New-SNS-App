import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/api/getComments/:postId", async (c) => {
  const { postId } = c.req.param();

  const comment = await prisma.comment.findMany({
    where: { postId: postId },
    include: {
      author: true,
    },
  });

  return c.json(comment);
});

export async function GET(req: Request) {
  return app.fetch(req);
}
