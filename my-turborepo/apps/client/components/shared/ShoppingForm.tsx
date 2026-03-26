"use client"

import { useAppDispatch, useAppSelector } from "@/app/hooks/usereduxhook"
import { Trash2 } from "lucide-react"
import { removeFromCart } from "@/app/Store/features/cartSlice"

import Image from "next/image"
export default function ShoppingForm() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cart.cartItems)

  return (
    <div>
      {
        cartItems.map((item) => (
          //single cart tiem
          <div className="flex items-center justify-between" key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
            {/* //image   */}
            <div className="flex gap-8">
              <div className="relative w-30 h-30 bg-gray-100 rounded-lg overflow-hidden">
                {item.images?.[item.selectedColor] && (
                  <Image
                    src={item.images?.[item.selectedColor] || ""}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              {/* //detials  */}
              <div className="flex flex-col">
                <div className="flex flex-col ">
                  <p className="text-sm font-medium"> {""}{item.name}</p>
                  <p className="text-xs text-gray-500">Quantity:{" "}{item.quantity}</p>
                  <p className="text-xs text-gray-500">Size:{" "}{item.selectedSize}</p>
                  <p className="text-xs text-gray-500">Color:{" "}{item.selectedColor}</p>
                </div>
                <p className="font-medium mt-2" >${item.price?.toFixed(2)}</p>
              </div>


            </div>
            {/* //delt button  */}
            <button onClick={() => dispatch(removeFromCart({
              id: item.id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor
            }))} className="w-6 h-6 rounded-full hover:bg-red-300 transition-all duration-300  bg-red-200 flex items-center justify-center cursor-pointer">
              <Trash2 className="w-3 h-3" />
            </button>

          </div>
        ))
      }
    </div>
  )
}
