import { Hono } from "hono";
import { prisma } from "@/lib/prisma";

const app = new Hono();

app.get("/api/getUserInfo/:userId", async (c) => {
  const userId = c.req.param("userId");

  const userInfo = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      posts: {
        include: {
          comment:{
            include:{
              author:true
            }
          },
          _count: {
            select: {
              like: true,
              comment: true,
            },
          },
        },
      },

      like: true,
      comment: true,
      _count: {
        select: {
          posts: true,
          like: true,
        },
      },
    },
  });
  return c.json(userInfo);
});

export async function GET(req: Request) {
  return app.fetch(req);
}
