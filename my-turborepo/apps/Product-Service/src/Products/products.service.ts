import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/index.js";
import { UpdateProductDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import type { Prisma } from "@repo/product-db";

@Injectable()
export class ProductsService {
  async getAll() {
    const data = await prisma.product.findMany();
    return data;
  }

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
    });
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

    return await prisma.product.create({ data: createData });
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

    return await prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  }
}