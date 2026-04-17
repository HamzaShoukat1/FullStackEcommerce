// import { prisma } from "./src/client";
import {prisma} from "@repo/product-db"

async function main() {
  const result = await prisma.$queryRaw`SELECT 1 as ok`;
  console.log("DB Connected:", result);
}
main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("DB Connection Failed:", e);
    process.exit(1);
  });