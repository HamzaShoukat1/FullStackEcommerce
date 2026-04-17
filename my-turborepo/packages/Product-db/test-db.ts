// import { prisma } from "./src/client";
import {prisma} from "@repo/product-db"

async function main() {
  // const result = await prisma.$queryRaw`SELECT 1 as ok`;
   const category = await prisma.category.create({
    data: {
      name: "Test Category",
      slug: "test-category",
    },
  });
    const product = await prisma.product.create({
    data: {
      name: "Test Product",
      shortDescription: "Short desc",
      description: "Full description",
      price: 100,
      sizes: ["M"],
      colors: ["Black"],
      images: {},
      categorySlug: "test-category"
    }
  });

  // console.log("DB Connected:", result);
  console.log("Created Product:", product);
}
main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("DB Connection Failed:", e);
    process.exit(1);
  });