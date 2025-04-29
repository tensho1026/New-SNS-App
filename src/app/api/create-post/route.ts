import { Hono } from "hono";
import { createPostSchema } from "@/lib/schemas/post";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.post("/api/create-post", async (c) => {
  try {
    const body = await c.req.json();
    console.log("📦 リクエストボディ:", body);

    const result = createPostSchema.safeParse(body);
    if (!result.success) {
      console.log("❌ バリデーションエラー:", result.error.format());
      return c.json({ error: result.error.format() }, 400);
    }

    const { content, imageUrl } = result.data;

    const post = await prisma.post.create({
      data: {
        authorId: body.clerkId,
        content: content,
        image: imageUrl,
      },
    });

    return c.json({ message: "Post Created", post }, 200);
  } catch (err) {
    console.error("❌ サーバー例外:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}
