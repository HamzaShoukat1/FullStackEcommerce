import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Controller('products')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany();
      return { success: true, data: products };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}
