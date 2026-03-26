"use client";

import Link from "next/link";
import { ProductType } from "@/app/types";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/app/hooks/usereduxhook";
import { addToCart } from "@/app/Store/features/cartSlice";

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useAppDispatch()
  const [productsetType, setproductsetType] = useState({
    size: product.sizes[0],
    color: product.colors[0]
  })
  console.log(productsetType)
  type producttype = {
    type: "size" | "color"
    value: string
  }
  const handleProductType = ({ type, value }: producttype) => {
    setproductsetType((prev) => ({
      ...prev,
      [type]: value
    }))


  }
const handelAddtoCart = ()=> {
  dispatch(addToCart({
    product,
    quantity:1 ,
    selectedSize:productsetType.size,
    selectedColor:productsetType.color
  }))

}


  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-2/3">
          <Image
            src={product.images?.[productsetType.color] || ""}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium truncate">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>

        {/* Size & Color Selection */}
        <div className="flex items-center gap-4 text-xs">
          {/* Size */}
          <div className="flex flex-col gap-1 items-center">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="cursor-pointer ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) => handleProductType({ type: "size", value: e.target.value })}
            >
              {product.sizes.map((size) => (
                <option key={size} value={size} className="cursor-pointer">
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div key={color} className={`cursor-pointer border ${productsetType.color === color ? "border-gray-400" : "border-gray-200"} rounded-full p-[1.2px]`} onClick={() => handleProductType({ type: "color", value: color })}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Cart Button */}
        <div className="flex items-center gap-2 justify-between mt-2">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button onClick={handelAddtoCart} className="flex items-center gap-2 bg-white text-black shadow-md text-xs rounded-md px-3 py-1  cursor-pointer hover:bg-black hover:text-white hover:ring-1 hover:ring-gray-400 transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart

          </button>
        </div>
      </div>
    </div>
  );
}