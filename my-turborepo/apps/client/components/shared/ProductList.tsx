"use client";
import Link from "next/link";
import { ProductDTO } from "@repo/shared";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";
import { useSearchParams } from "next/navigation";
import ClientOnly from "@/app/hooks/onlyClient";

// TEMPORARY
// const products: ProductDTO[] = [(
//     {
//         id: 1,
//         name: "Adidas CoreFit T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 39.9,
//         sizes: ["s", "m", "l", "xl", "xxl"],
//         colors: ["gray", "purple", "green"],
//         images: {
//             gray: "/products/1g.png",
//             purple: "/products/1p.png",
//             green: "/products/1gr.png",
//         },
//         categorySlug: "t-shirts",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
//     {
//         id: 2,
//         name: "Puma Ultra Warm Zip",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l", "xl"],
//         colors: ["gray", "green"],
//         images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//         categorySlug: "t-shirts",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     },
//     {
//         id: 3,
//         name: "Nike Air Essentials Pullover",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["s", "m", "l"],
//         colors: ["green", "blue", "black"],
//         images: {
//             green: "/products/3gr.png",
//             blue: "/products/3b.png",
//             black: "/products/3bl.png",
//         },
//         categorySlug: "t-shirts",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     },
//     {
//         id: 4,
//         name: "Nike Dri Flex T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 29.9,
//         sizes: ["s", "m", "l"],
//         colors: ["white", "pink"],
//         images: { white: "/products/4w.png", pink: "/products/4p.png" },
//         categorySlug: "t-shirts",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
//     {
//         id: 5,
//         name: "Under Armour StormFleece",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 49.9,
//         sizes: ["s", "m", "l"],
//         colors: ["red", "orange", "black"],
//         images: {
//             red: "/products/5r.png",
//             orange: "/products/5o.png",
//             black: "/products/5bl.png",
//         },
//         categorySlug: "t-shirts",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
//     {
//         id: 6,
//         name: "Nike Air Max 270",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["40", "42", "43", "44"],
//         colors: ["gray", "white"],
//         images: { gray: "/products/6g.png", white: "/products/6w.png" },
//         categorySlug: "t-shirts",
//       createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
//     {
//         id: 7,
//         name: "Nike Ultraboost Pulse ",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["40", "42", "43"],
//         colors: ["gray", "pink"],
//         images: { gray: "/products/7g.png", pink: "/products/7p.png" },
//         categorySlug: "t-shirts",
//       createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
//     {
//         id: 8,
//         name: "Levi's Classic Denim",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l"],
//         colors: ["blue", "green"],
//         images: { blue: "/products/8b.png", green: "/products/8gr.png" },
//         categorySlug: "t-shirts",
//       createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//     },
// ]


export default function ProductList({ params , category:propCategory }: { params?: "homepage" | "products", category?: string },) {
    const searchParams = useSearchParams()

    const category =   propCategory || searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "newest";
    const search = searchParams.get("search") || "";




    const { data: productsData, isError } = useQuery({
        queryKey: ["products", category, params, sort, search],
        queryFn: () => getProducts({ category, params, sort, search }),
    })


    return (
        <ClientOnly>
            <div className="w-full">

                <Categories />
                {params === "products" && <Filter />}
                <div className="grid  gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">


                    {productsData?.data.map((product: ProductDTO) => (

                        <ProductCard key={product.id} product={product} />

                    ))}


                    {isError && <p>Error loading products.</p>}
                </div>


                <Link
                    href={category ? `/products?category=${category}` : "/products"}
                    className="flex justify-end mt-4 underline text-gray-500 text-sm"
                >
                    View all Products
                </Link>
            </div>
        </ClientOnly>
    )
}
