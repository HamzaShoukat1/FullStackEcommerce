import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/index.js";
import { UpdateCategoryDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import  { Prisma } from "@repo/product-db";

@Injectable()
export class CategoriesService {
  
  async getAll() {
    return await prisma.category.findMany();
  }

  async getById(id: number) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data: CreateCategoryDto) {
    return await prisma.category.create({
      data: data as Prisma.CategoryCreateInput,
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    return await prisma.category.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
      },
    });
  }

  async delete(id: number) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}