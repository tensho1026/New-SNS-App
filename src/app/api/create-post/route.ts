import { Hono } from "hono";
import { supabase } from "@/supabase/supabase.config";
import { createPostSchema } from "@/lib/schemas/post";

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

    const { error } = await supabase.from("Post").insert({
      authorId: body.clerkId,
      content: content,
      image: imageUrl,
    });

    if (error) {
      console.error("❌ DB挿入エラー:", error.message);
      return c.json({ error: error.message }, 500);
    }

    return c.json({ message: "Post Created" }, 200);
  } catch (err) {
    console.error("❌ サーバー側で例外:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}
