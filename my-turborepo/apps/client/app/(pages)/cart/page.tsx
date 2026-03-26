"use client"
import {  shippingformInputs } from "@/app/types";
import ShippingAdressForm from "@/components/shared/ShippingAdressForm";
import PaymentForm from "@/components/shared/PaymentForm";
import ShoppingForm from "@/components/shared/ShoppingForm";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {  useAppSelector } from "@/app/hooks/usereduxhook";
import ClientOnly from "@/app/hooks/onlyClient";

const steps = [
  {
    id: 1,
    title: "Shopping Cart"
  },
  {
    id: 2,
    title: "Shipping Address"
  },
  {
    id: 3,
    title: "Shipping Method"
  },

];

// temp  
// export const cartItems: cartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray"
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 2,
//     selectedSize: "l",
//     selectedColor: "gray"
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "black"


//   },
// ]


export default function page() {
  const cartItems = useAppSelector(state=>state.cart.cartItems)
  const [Shippingform, setShippingform] = useState<shippingformInputs | null>(null)
const subtotal = useMemo(() => 
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
, [cartItems]);  const discount = subtotal * 0.1
  const shipping = 10

  const total = subtotal - discount + shipping

  const searchParams = useSearchParams()
  const router = useRouter()
  const activeStep = parseInt(searchParams.get("step") || "1")
  return (
    <ClientOnly>

    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* //title  */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* //steps  */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800 " : "border-gray-200"}`} key={step.id}>
            <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}>
              {step.id}
            </div>
            <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{step.title}</p>

          </div>
        ))}

      </div>

      {/* // cart items and details  */}
      <div className=" w-full flex flex-col lg:flex-row gap-16">
        {/* //cart items  */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8  p-8">
          {activeStep === 1 ? (
            <ClientOnly>

              <ShoppingForm />
            </ClientOnly>
          ) : activeStep === 2 ? (<ShippingAdressForm setShippingform={setShippingform} />) : activeStep === 3 && Shippingform ? (<PaymentForm />) : <p className="text-sm text-gray-500">please fill in the shipping form to continue</p>}


        </div>
        {/* /cart dettial  */}
        <div className="w-full lg:w-5/12  shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8  p-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">SubTotal</p>

              <p className="text-sm font-medium">${subtotal.toFixed(2)}</p>

            </div>
            {/* // */}
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Discount(10%)</p>
              <p className="font-medium text-red-400">-$10</p>

            </div>
            {/* //  */}
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Shipping Fee</p>
              <p className="text-sm font-medium">$10</p>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <p className="text-sm text-gray-800 font-semibold">Total</p>
              <p className="text-sm  text-gray-900 font-semibold">${total.toFixed(2)}</p>



            </div>





          </div>




          {activeStep === 1 && (

            <button onClick={() => router.push("/cart?step=2", { scroll: false })} className=" flex items-center gap-2 hover:bg-gray-900 transition-all duration-300 justify-center w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer">
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

        </div>


      </div>



    </div>
    </ClientOnly>

  )
}
