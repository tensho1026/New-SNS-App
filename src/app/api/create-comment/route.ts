import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { createCommentSchema } from "@/lib/schemas/comment";

const app = new Hono();

app.post("/api/create-comment", async (c) => {
  try{ const body = await c.req.json();
    const result = createCommentSchema.safeParse(body)
    if (!result.success) {
      console.log("❌ バリデーションエラー:", result.error.format());
      return c.json({ error: result.error.format() }, 400);
    }
    console.log("📦 リクエストボディ:", body);
    const {content,postId} = result.data
  
    const comment = await prisma.comment.create({
      data: {
      content:content,
      authorId:body.clerkId,
      postId:postId
      }
      
    })
    return c.json({ message: "Post Created", comment}, 200);
  } catch(err) {
    console.error("❌ サーバー例外:", err);
    return c.json({ error: "Internal Server Error" }, 500);
    }
 
})

export async function POST(req: Request) {
  return app.fetch(req);
}

