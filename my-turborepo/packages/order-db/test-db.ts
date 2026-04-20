// import { prisma } from "./src/client";
import { prisma } from "@repo/order-db";

async function main() {
  const order = await prisma.order.create({
    data: {
      orderNumber: "ORD-TEST-0001",
      userId: "user-test-1",
      status: "PENDING",
      currency: "USD",
      subtotal: 100,
      shippingAmount: 10,
      taxAmount: 5,
      totalAmount: 115,
      shippingAddress: {
        line1: "123 Test Street",
        city: "Test City",
        country: "US",
      },
      items: {
        create: [
          {
            productId: 1,
            productName: "Test Product",
            productSku: "TEST-001",
            unitPrice: 100,
            quantity: 1,
            totalPrice: 100,
          },
        ],
      },
    },
    include: {
      items: true,
    },
  });

  console.log("Created Order:", order);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  });