import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/index.js";
import { UpdateProductDto } from "./dto/index.js";
import { prisma } from "@repo/product-db";
import { Prisma } from "@repo/product-db";
@Injectable()
export class ProductsService {


  async getAll(query: any) {
    const { sort, category, search, limit } = query

    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return { price: Prisma.SortOrder.asc }
        case "desc":
          return { price: Prisma.SortOrder.desc }
        case "oldest":
          return { createdAt: Prisma.SortOrder.asc }

        default:
          return { createdAt: Prisma.SortOrder.desc }
      }
    })()

    const allProducts = await prisma.product.findMany({
      where: {
        category: {
          slug: category as string
        },
        name: {
          contains: search as string,
          mode: "insensitive"
        }
      },
      orderBy,
      take:limit ? Number(limit) : undefined
    });
    if (!allProducts) {
      throw new NotFoundException("No products found");
    }
    return allProducts;
  }


  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id:Number(id) },
    });


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
      category: {
        connect: { slug: data.categorySlug },
      }
    };
    const { colors, images } = createData
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      throw new NotFoundException("Colors array is required and should not be empty");
    }
    if (!images || typeof images !== 'object' || Object.keys(images).length === 0) {
      throw new NotFoundException("Images object is required and should not be empty");
    }
    const missingColors = colors.filter((color) => !(color in images))
    if (missingColors.length > 0) {
      throw new NotFoundException(`Missing images for colors: ${missingColors.join(", ")}`);
    }

    try {
      const createProduct = await prisma.product.create({ data: createData });


      return createProduct
    } catch (error) {
      throw new NotFoundException("Category not found");
    }
  }
async update(id: number, data: UpdateProductDto) {
  const updateData: Prisma.ProductUpdateInput = {
    ...(data.name !== undefined && { name: data.name }),
    ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.price !== undefined && { price: data.price }),
    ...(data.sizes !== undefined && { sizes: data.sizes }),
    ...(data.colors !== undefined && { colors: data.colors }),
    ...(data.images !== undefined && { images: data.images }),

    ...(data.categorySlug !== undefined && {
      category: {
        connect: { slug: data.categorySlug }
      }
    })
  };

  return prisma.product.update({
    where: { id },
    data: updateData
  });
}


  async delete(id: number) {
    const deleteProduct = await prisma.product.delete({
      where: { id },
    });

    return deleteProduct}
}