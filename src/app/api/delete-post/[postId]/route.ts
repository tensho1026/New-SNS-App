import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.delete("/api/delete-post/:postId", async (c) => {
  const postId = c.req.param("postId");

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    return c.json({ message: "Post deleted" }, 200);
  } catch (err) {
    console.error("削除エラー:", err);
    return c.json({ error: "削除に失敗しました" }, 500);
  }
});

export async function DELETE(req: Request) {
  return app.fetch(req);
}
