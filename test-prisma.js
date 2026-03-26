const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();
console.log('Product model exists:', !!client.product);
console.log('Available properties:', Object.keys(client).filter(k => !k.startsWith('$')).slice(0, 10));
client.$disconnect();