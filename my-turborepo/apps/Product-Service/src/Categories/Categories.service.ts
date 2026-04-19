import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/index.js";
import { UpdateCategoryDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import  { Prisma } from "@repo/product-db";

@Injectable()
export class CategoriesService {
  
  async getAll() {
    const  allCategories =  await prisma.category.findMany();
    if(!allCategories){
      throw new NotFoundException("No categories found");
    }
    return allCategories;
  }

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  async create(data: CreateCategoryDto) {
    
      const createCategory =  await prisma.category.create({
        data: data as Prisma.CategoryCreateInput,
      });
      if(!createCategory){
        throw new NotFoundException("Failed to create category");
      }
      return createCategory
    } 
  

  async update(id: number, data: UpdateCategoryDto) {
      const updateCategory =  await prisma.category.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.slug && { slug: data.slug }),
        },
      });
      if(!updateCategory){
        throw new NotFoundException("Category not found");
      }
      return updateCategory
    } 
  

  async delete(id: number) {
      const deleteCategory =  await prisma.category.delete({
        where: { id },
      });
      if(!deleteCategory){
        throw new NotFoundException("Category not found");
      }
      return deleteCategory
    } 
  
}