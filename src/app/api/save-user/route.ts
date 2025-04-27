import { Hono } from "hono";
import { supabase } from "@/supabase/supabase.config";

const app = new Hono();

app.post("/api/save-user", async (c) => {
  const body = await c.req.json();
  if (!body?.clerkId) return c.json({ error: "Missing clerkId" }, 400);

  const { error } = await supabase.from("User").upsert({
    clerkId: body.clerkId,
    username: body.username,
    imageUrl: body.imageUrl,
  });

  if (error) return c.json({ error: error.message }, 500);
  return c.json({ message: "User saved" }, 200);
});

export async function POST(req: Request) {
  return app.fetch(req);
}
