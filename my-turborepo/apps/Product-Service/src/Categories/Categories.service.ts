import {
  Injectable,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/index.js";
import { UpdateCategoryDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import  { Prisma } from "@repo/product-db";

@Injectable()
export class CategoriesService {
  
  async getAll() {
    const  allCategories =  await prisma.category.findMany();

    return allCategories;
  }

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });



    return category;
  }

  async create(data: CreateCategoryDto) {
    
      const createCategory =  await prisma.category.create({
        data: data as Prisma.CategoryCreateInput,
      });
 
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
   
      return updateCategory
    } 
  

  async delete(id: number) {
      const deleteCategory =  await prisma.category.delete({
        where: { id },
      });

      return deleteCategory
    } 
  
}