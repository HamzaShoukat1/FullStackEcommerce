import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/index.js";
import { UpdateProductDto } from "./dto/index.js";
import { prisma, Prisma } from "@repo/db";
@Injectable()
export class ProductsService {
  
  async getAll(query: any) {
    const { sort, category, search, limit } = query;


    const orderBy = (() => {
      switch (sort) {
        case "asc":
          return { price: Prisma.SortOrder.asc };
        case "desc":
          return { price: Prisma.SortOrder.desc };
        case "oldest":
          return { createdAt: Prisma.SortOrder.asc };
        case "newest":
        default:
          return { createdAt: Prisma.SortOrder.desc };
      }
    })();

    const where: Prisma.ProductWhereInput = {};


    if (category && category !== "all") {
      where.categorySlug = category
    }

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }
    const allProducts = await prisma.product.findMany({
      where,
      orderBy,
      take: limit ? Number(limit) : undefined,

    },

  );

    return allProducts;
  }


  async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    });


    return product;
  }

  async create(data: CreateProductDto) {

    const formattedPrice = Number(Number(data.price).toFixed(2));
    const createData: Prisma.ProductCreateInput = {
      name: data.name,
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      price: formattedPrice,
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

      const createProduct = await prisma.product.create({ data: createData });
      if(!createProduct.categorySlug) {
        throw new NotFoundException("Category slug is required");
      }
      if(!createProduct) {
        throw new NotFoundException("Failed to create product");
      };


      return createProduct
    } 
  
  async update(id: string, data: UpdateProductDto) {
    const updateData: Prisma.ProductUpdateInput = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: Number(data.price) }),
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


  async delete(id: string) {
    const deleteProduct = await prisma.product.delete({
      where: { id },
    });

    return deleteProduct
  };



}