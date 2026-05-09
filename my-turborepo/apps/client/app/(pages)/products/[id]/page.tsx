


import Image from "next/image"
import ProductInteraction from "@/components/shared/ProductInteraction"
import { ProductDTO } from "@repo/shared"
import { getProductById } from "@/services/product.service"

// const product: ProductDTO = {
//     id: 1,
//     name: "Nike Dri Flex T-Shirt",
//     shortDescription:
//         "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//         "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 29.9,
//     sizes: ["s", "m", "l"],
//     colors: ["white", "pink"],
//     images: { white: "/products/4w.png", pink: "/products/4p.png" },
//     categorySlug: "t-shirts",
//       createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
// }



export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const product: ProductDTO = await getProductById(id)


    // const { data: product } = useQuery<ProductDTO>({
    //     queryKey: ["products", id],
    //     queryFn: () => getProductById(id)
    // })


    return {
        title: product.name,
        describe: product.description
    }
}


export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ size?: string; color?: string }>
}) {
    const { id } = await params
    const product = await getProductById(id)
    const { size, color } = await searchParams;

    const selectedSize = size || product.data.sizes[0] || ""
    const selectedColor = color || product.data.colors[0] || ""




    return (
        <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">

            {/* Images */}
            <div className="w-full lg:w-5/12 relative aspect-2/3">
                <Image
                    src={product.data.images?.[selectedColor] || ""}
                    alt={product.data.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Details */}
            <div className="w-full lg:w-7/12 flex flex-col gap-4">
                <h1 className="text-2xl font-medium">{product.data.name}</h1>
                <p className="text-gray-500">{product.data.description}</p>
                <p className="text-lg font-semibold mt-2">${Number(product.data.price).toFixed(2)}</p>

                <ProductInteraction product={product} selectedSize={selectedSize} selectedColor={selectedColor} />
                {/* CARD INFO */}
                <div className="flex items-center gap-2 mt-4">
                    <Image
                        src="/klarna.png"
                        alt="klarna"
                        width={50}
                        height={25}
                        className="rounded-md"
                    />
                    <Image
                        src="/cards.png"
                        alt="cards"
                        width={50}
                        height={25}
                        className="rounded-md"
                    />
                    <Image
                        src="/stripe.png"
                        alt="stripe"
                        width={50}
                        height={25}
                        className="rounded-md"
                    />
                </div>
                <p className="text-gray-500 text-xs">
                    By clicking Pay Now, you agree to our{" "}
                    <span className="underline hover:text-black">Terms & Conditions</span>{" "}
                    and <span className="underline hover:text-black">Privacy Policy</span>
                    . You authorize us to charge your selected payment method for the
                    total amount shown. All sales are subject to our return and{" "}
                    <span className="underline hover:text-black">Refund Policies</span>.
                </p>
            </div>
        </div>
    )
}