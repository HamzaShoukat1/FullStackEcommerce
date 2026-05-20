import "dotenv/config";
import { CookieOptions } from "express";
import * as z from "zod";

export type TokenPayload = {
    sub: number;
    email: string;
    role: string;
};

const getEnvOrThrow = (key: string): string => {
    const value = process.env[key]?.trim();
    if (!value) {
        throw new Error(`${key} is not configured`);
    }
    return value;
};

export const getAccessTokenSecret = (): string => getEnvOrThrow('JWT_ACCESS_SECRET');
export const getRefreshTokenSecret = (): string => getEnvOrThrow('JWT_REFRESH_SECRET');
export const getJwtAccessExpires = (): string => getEnvOrThrow('JWT_ACCESS_EXPIRES')?.trim() || '1h';
export const getJwtRefreshExpires = (): string => getEnvOrThrow('JWT_REFRESH_EXPIRES')?.trim() || '7d';

// export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
// export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;
// export const JWT_ACCESS_EXPIRES = (process.env.JWT_ACCESS_EXPIRES ?? '15m') as any;
// export const JWT_REFRESH_EXPIRES = (process.env.JWT_REFRESH_EXPIRES ?? '7d') as any;

export const ACCESS_COOKIE_OPTION: CookieOptions = {
    httpOnly: true,
    secure: false, //true in production
    sameSite: 'lax', //none inproduction
    path: '/',
    maxAge: 1 * 60 * 60 * 1000, // 1 hour (default access token expiry)
}
export const REFRESH_COOKIE_OPTION: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}
export interface AuthRequest extends Request {
    user: {
        sub: number;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
        address: string;

    };
    cookies?: {
        accessToken?: string;
        refreshToken?: string;
    }
};
export interface OrderChartType {
    month: string;
    total: number;
    successful: number;
};

export const addCategoryformSchema = z.object({
    name: z.string().min(1, { message: "Slug is Required!" }),
    slug: z.string().min(1, { message: "Slug is Required!" }),

});
export type addOrderCategoryformSchematype = z.infer<typeof addCategoryformSchema>



export const addUserformSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters!" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters!" }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters!" }),
});
export type addUserformSchematype = z.infer<typeof addUserformSchema>




// ,, 

export const categories = [
    "T-shirts",
    "Shoes",
    "Accessories",
    "Bags",
    "Dresses",
    "Jackets",
    "Gloves",
] as const;



export const colors = [
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



export const addProductformSchema = z.object({
    name: z.string().min(1, { message: "Product name is required!" }),
    shortDescription: z
        .string()
        .min(1, { message: "Short description is required!" })
        .max(60),
    description: z.string().min(1, { message: "Description is required!" }),
    price: z.number().min(1, { message: "Price is required!" }),
    categorySlug: z.string().min(1, { message: "Category is required!" }),
    sizes: z.array(z.enum(sizes)).min(1, { message: "At least one size must be selected!" }),
    colors: z.array(z.enum(colors)).min(1, { message: "At least one color must be selected!" }),
    images: z.record(z.string(), z.string(), { message: "Image for each color is required!" })

}).refine((data) => {
    const missingImagesforthatColor = data.colors?.filter((color: string) => !data.images[color])

    return missingImagesforthatColor?.length === 0
}, {
    message: "Image for each selected color is required!",
    path: ["images"]
})

export type addProductformSchematype = z.infer<typeof addProductformSchema>



export type Product = {
    id: string | number;
    price: number;
    name: string;
    shortDescription: string;
    description: string;
    sizes: string[];
    colors: string[];
    images: Record<string, string>
};