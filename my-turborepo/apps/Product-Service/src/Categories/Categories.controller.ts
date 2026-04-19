import { Controller, Get, Post, Delete, Param, Body, Inject, Patch } from '@nestjs/common';
import { CategoriesService } from './Categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.js';


@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.categoriesService.getById(Number(id));
  }

  @Post()
  async create(@Body() data: CreateCategoryDto) {

    return this.categoriesService.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto
  ) {
    return this.categoriesService.update(Number(id), data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoriesService.delete(Number(id));
  }
}