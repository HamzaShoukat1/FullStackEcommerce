
import { shippingformInputs, shippingFormSchema } from "@/app/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from "react-hook-form"


export default function ShippingAdressForm({ setShippingform }: { setShippingform: (data: shippingformInputs) => void }) {
  const router = useRouter()


  const { register, handleSubmit, formState: { errors } } = useForm<shippingformInputs>({
    resolver: zodResolver(shippingFormSchema)
  })
  const handleSubmitShipping: SubmitHandler<shippingformInputs> = (data) => {

    setShippingform(data)

    router.push("/cart?step=3", { scroll: false })
    console.log(data)
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSubmitShipping)}>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500" htmlFor="name">Name</label>
        <input className="border-b border-gray-300 py-2 outline-none text-sm" type="text" id="name" placeholder="john ed"  {...register("name")} />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name?.message}</p>
        )}

      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500" htmlFor="email">Email</label>
        <input className="border-b border-gray-300 py-2 outline-none text-sm" type="email" id="email" placeholder="john@gmail.com"  {...register("email")} />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email?.message}</p>
        )}

      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500" htmlFor="phone">Phone No</label>
        <input className="border-b border-gray-300 py-2 outline-none text-sm" type="text" id="phone" placeholder="+996"  {...register("phone")} />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone?.message}</p>
        )}

      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500" htmlFor="address">Address</label>
        <input className="border-b border-gray-300 py-2 outline-none text-sm" type="text" id="address" placeholder="franciso"  {...register("address")} />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address?.message}</p>
        )}

      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500" htmlFor="city">City</label>
        <input className="border-b border-gray-300 py-2 outline-none text-sm" type="text" id="city" placeholder="branzil"  {...register("city")} />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city?.message}</p>
        )}

      </div>


      <button type="submit" className=" flex items-center gap-2 hover:bg-gray-900 transition-all duration-300 justify-center w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer">
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>

  )
}
