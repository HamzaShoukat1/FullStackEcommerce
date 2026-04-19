import { Controller, Get, Post, Delete, Param, Body, Inject, Patch } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService)
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  async getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productsService.getById(Number(id));
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto
  ) {
    return this.productsService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}