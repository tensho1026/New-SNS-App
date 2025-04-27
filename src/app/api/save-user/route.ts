// import { supabase } from "@/supabase/supabase.config";
// import { Hono } from "hono";
// const app = new Hono();

// app.post(async (c) => {
//   try {
//     const body = await c.req.json();
//     const user = body;
//     if (!user) {
//       return c.json({ error: "Missing user" }, 400);
//     }

//     const { error } = await supabase.from("User").upsert({
//       clerkId: body.clerkId,
//       username: body.username,
//       imageUrl: body.imageUrl,
//     });
//     if (error) {
//       console.log("Supabase error:", error);
//       return c.json({ error: "Failed to save user" }, 500);
//     }

//     return c.json({ message: "User saved successfully" }, 200);
//   } catch (error) {
//     console.error(error);
//     return c.json({ error: "Internal Server Error" }, 500);
//   }
// });
import { supabase } from "@/supabase/supabase.config";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || !body.clerkId) {
      return new Response(JSON.stringify({ error: "Missing clerkId" }), {
        status: 400,
      });
    }

    const { error } = await supabase.from("User").upsert({
      clerkId: body.clerkId,
      username: body.username,
      imageUrl: body.imageUrl,
    });

    if (error) {
      console.error("Supabase error:", error);
      return new Response(JSON.stringify({ error: "Failed to save user" }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "User saved successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
