import { Controller, Get, Post, Delete, Param, Body, Inject, Patch, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';
import { IsAuthenticatedGuard, Roles, RolesGuard } from '@repo/shared';
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) { }

  @Get()
  async getAll(@Query() query: any): Promise<unknown> {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<unknown> {
    return this.productsService.getById(id);
  }

  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN") //roles = ['ADMIN]
  @Post()
  async create(@Body() dto: CreateProductDto): Promise<unknown> {
    return this.productsService.create(dto);
  }

  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN")
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto
  ): Promise<unknown> {
    return this.productsService.update(id, dto);
  }
  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN")
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<unknown> {
    return this.productsService.delete(id);
  }
}