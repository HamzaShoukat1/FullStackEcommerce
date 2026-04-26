import { prisma } from "@repo/auth-db";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: `test-${Date.now()}@example.com`,
      passwordHash: "hashed-password",
      firstName: "Test",
      lastName: "User",
      sessions: {
        create: {
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          ipAddress: "127.0.0.1",
          userAgent: "auth-db-test",
        },
      },
      refreshTokens: {
        create: {
          token: `rt-${Date.now()}`,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
      },
    },
    include: {
      sessions: true,
      refreshTokens: true,
    },
  });

  console.log("Created User:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  });