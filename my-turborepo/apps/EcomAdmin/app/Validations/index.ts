import z from "zod";
export const categories = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;



export  const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

export const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;


export const editUserformSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Fullname must be at least 2 characters!" })
    .max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  address: z.string().min(2),
    city: z.string().min(2),

});
export type editUserformSchematype = z.infer<typeof editUserformSchema>

export const addUserformSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters!" })
    .max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  address: z.string().min(2),
  city: z.string().min(2),
});
export type addUserformSchematype = z.infer<typeof addUserformSchema>

export const addOrderformSchema = z.object({
  amount: z.number().min(1, { message: "Amount must be at least 1!" }),
  userId: z.string().min(1, { message: "User Id is required!" }),
  status: z.enum(["pending", "processing", "success", "failed"]),
});
export type addOrderformSchematype = z.infer<typeof addOrderformSchema>
export const addCategoryformSchema = z.object({
  name: z.string().min(1, { message: "Name is Required!" }),
});
export type addOrderCategoryformSchematype = z.infer<typeof addCategoryformSchema>

export const addProductformSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required!" }),
  category: z.enum(categories),
  sizes: z.array(z.enum(sizes)),
  colors: z.array(z.enum(colors)),
  images: z.record(z.enum(colors), z.string()),
});

export type addProductformSchematype = z.infer<typeof addProductformSchema>


export type Product = {
  id: string | number;
  price: number;
  name: string;
  shortDescription: string;
  description: string;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type Payment = {
  id: string;
  amount: number;
  FullName: string;
  userId:string
  email: string;
  status: "pending" | "processing" | "success" | "failed";
};
export type User = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;

  status: "active" | "inactive";
};