import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { createProfileSchema } from "@/lib/schemas/prifile";

const app = new Hono();

app.put("/api/create-profile/:userId", async (c) => {
const userId = c.req.param("userId")

try {
    const body = await c.req.json();
    console.log("📦 リクエストボディ:", body);

    const result = createProfileSchema.safeParse(body);
    if (!result.success) {
      console.log("❌ バリデーションエラー:", result.error.format());
      return c.json({ error: result.error.format() }, 400);
    }

    const {username, content, imageUrl } = result.data;

    const profile = await prisma.user.update({
      where: { id: userId },
      data: {
       username:username,
        myself: content,
        imageUrl:imageUrl
      },
    });

    return c.json({ message: "Profile Created",profile }, 200);
  } catch (err) {
    console.error("❌ サーバー例外:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }

})

export async function PUT(req: Request) {
  return app.fetch(req);
}
