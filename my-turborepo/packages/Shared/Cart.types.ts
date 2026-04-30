import type { Product } from "@repo/db";
import { z } from "zod";

export type CartItemType = Product & {
    quantity: number
    selectedSize: string
    selectedColor: string

}

export type CartItemsType = CartItemType[]


export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .max(12, "Phone number must be between 10 and 12 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});
export type shippingformInputs = z.infer<typeof shippingFormSchema>



export type CartStoreItemTypes = {
  cart: CartItemsType
}