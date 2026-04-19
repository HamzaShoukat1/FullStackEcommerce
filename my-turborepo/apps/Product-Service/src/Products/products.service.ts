import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/index.js";
import { UpdateProductDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import type { Prisma } from "@repo/product-db";

@Injectable()
export class ProductsService {


  async getAll() {
    const allProducts = await prisma.product.findMany();
    if(!allProducts){
      throw new NotFoundException("No products found");
    }
    return allProducts;
  }
  

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async create(data: CreateProductDto) {
 
    const createData: Prisma.ProductCreateInput = {
      name: data.name,
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      price: data.price,
      sizes: data.sizes || [],
      colors: data.colors || [],
      images: data.images || {},
      category:{
        connect: { slug: data.categorySlug },
      }
    };

     try {
       const createProduct = await prisma.product.create({ data: createData });
    
  
       return createProduct
     } catch (error) {
       throw new NotFoundException("Category not found");
     }
    } 

  async update(id: number, data: UpdateProductDto) {
    const updateData: Prisma.ProductUpdateInput = {
      ...(data.name && { name: data.name }),
      ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.sizes !== undefined && { sizes: data.sizes }),
      ...(data.colors !== undefined && { colors: data.colors }),
      ...(data.images !== undefined && { images: data.images }),
      ...(data.categorySlug && { categorySlug: data.categorySlug }),
    };

      const updateProduct =  await prisma.product.update({
        where: { id },
        data: updateData,
      });
      if(!updateProduct){
        throw new NotFoundException("Product not found");
      }
      return updateProduct
    } 
  

  async delete(id: number) {
      const deleteProduct =  await prisma.product.delete({
        where: { id },
      });
      if(!deleteProduct){
        throw new NotFoundException("Product not found");
      }
      return deleteProduct
    } 
}