import { Controller, Get, Post, Delete, Param, Body, Inject, Patch, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './Categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.js';


@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) { }

  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoriesService.getById(Number(id));
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto) {

    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.delete(id);
  }
}