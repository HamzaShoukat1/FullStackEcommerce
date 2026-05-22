"use client"
import { shippingformInputs } from "@repo/shared"
import ShippingAdressForm from "@/components/shared/ShippingAdressForm";
import ShoppingForm from "@/components/shared/ShoppingForm";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useAppSelector } from "@/app/hooks/usereduxhook";
import ClientOnly from "@/app/hooks/onlyClient";
import StripeCheckoutForm from "@/components/shared/StripePaymentCheckout";

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

// 1. The Core UI Component that uses search parameters safely
function CartContent() {
  const { totalAmount } = useAppSelector(state => state.cart)
  const [Shippingform, setShippingform] = useState<shippingformInputs | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const activeStep = parseInt(searchParams.get("step") || "1")

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      
      {/* Progress Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div 
            className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800 " : "border-gray-200"}`} 
            key={step.id}
          >
            <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`}>
              {step.id}
            </div>
            <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* Cart Layout Contents */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        
        {/* Dynamic Inner Step Forms */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8 p-8">
          {activeStep === 1 ? (
            <ClientOnly>
              <ShoppingForm />
            </ClientOnly>
          ) : activeStep === 2 ? (
            <ShippingAdressForm setShippingform={setShippingform} />
          ) : activeStep === 3 && Shippingform ? (
            <StripeCheckoutForm shippingForm={Shippingform} />
          ) : (
            <p className="text-sm text-gray-500">Please fill in the shipping form to continue</p>
          )}
        </div>
        
        {/* Cart Details Sidebar */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 rounded-lg flex flex-col gap-8 p-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>

          <div className="flex flex-col gap-4">
            <hr className="border-gray-300" />
            <div className="flex justify-between">
              <p className="text-sm text-gray-800 font-semibold">Total</p>
              <p className="text-sm text-gray-900 font-semibold">${totalAmount}</p>
            </div>
          </div>

          {activeStep === 1 && (
            <button 
              onClick={() => router.push("/cart?step=2", { scroll: false })} 
              className="flex items-center gap-2 hover:bg-gray-900 transition-all duration-300 justify-center w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

// 2. Clear Default Export wrapped cleanly in native NextJS Suspense
export default function Page() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm text-gray-500 font-medium">
            Loading layout components...
          </p>
        </div>
      }
    >
      <CartContent />
    </Suspense>
  )
}
