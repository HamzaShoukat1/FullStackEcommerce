import { Controller, Get, Post, Delete, Param, Body, Inject, Patch, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';
import { IsAuthenticatedGuard, Roles, RolesGuard } from '@repo/shared';
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly productsService: ProductsService,
  ) { }

  @Get()
  async getAll(@Query() query: any) {
    return this.productsService.getAll(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getById(id);
  }

  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN") //roles = ['ADMIN]
  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN")
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto
  ) {
    return this.productsService.update(Number(id), dto);
  }
  @UseGuards(IsAuthenticatedGuard, RolesGuard)
  @Roles("ADMIN")
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}