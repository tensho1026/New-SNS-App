// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// グローバル変数にキャッシュして多重生成を防ぐ（開発中のホットリロード対策）
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

// すでに存在するならそれを使う。なければ新しく作る
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 開発中のみグローバル変数に保持（本番環境では不要）
if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
