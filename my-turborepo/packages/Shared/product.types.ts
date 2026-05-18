
import type { Product, Category } from "@repo/db"
import  z from "zod"


export type productType = Product
export type productsTypes = productType[]

export type StripeProductTypes = {
    id: string
    name: string
    price: number
}

export type categoryType = Category;


export const addCategoryformSchema = z.object({
    name: z.string().min(1, { message: "Slug is Required!" }),
    slug: z.string().min(1, { message: "Slug is Required!" }),

});
export type addOrderCategoryformSchematype = z.infer<typeof addCategoryformSchema>