
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


