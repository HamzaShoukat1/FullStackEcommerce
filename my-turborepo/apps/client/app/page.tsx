import Image from "next/image"
import ProductList from "@/components/shared/ProductList"

export default async function Homepage({ searchParams }: { searchParams: Promise<{ category: string }> }) {
  const category = (await searchParams).category
  return (
    <div>
      <div className="relative aspect-3/1 mb-12">
        <Image src="/featured.png" alt="featured product" fill />
      </div>

      <ProductList category={category} params="homepage" />


    </div>)
}