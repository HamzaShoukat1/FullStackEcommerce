import Image from "next/image"
import ProductList from "@/components/shared/ProductList"

export default function Homepage() {


  // const category =  searchParams?.category || "all"
  // const sort = (await searchParams)?.sort || "newest"
  // const search = (await searchParams)?.search || ""
  return (
    <div>
      <div className="relative aspect-3/1 mb-12">
        <Image src="/featured.png" loading="eager" alt="featured product" fill />
      </div>

      <ProductList params="homepage" />


    </div>)
}