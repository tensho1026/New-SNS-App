import { Hono } from "hono";
import { prisma } from "@/lib/prisma"; // Prisma Client

const app = new Hono();

app.post("/api/save-user", async (c) => {
  const body = await c.req.json();

  if (!body?.clerkId) return c.json({ error: "Missing clerkId" }, 400);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: body.clerkId },
    });

    if (existingUser) {
      return c.json({ message: "User already exists" }, 200);
    }

    await prisma.user.create({
      data: {
        id: body.clerkId,
        username: body.username,
        imageUrl: body.imageUrl,
      },
    });

    return c.json({ message: "User saved" }, 200);
  } catch (err) {
    console.error("❌ Prisma Error:", err);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}
