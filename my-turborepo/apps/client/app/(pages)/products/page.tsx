import ProductList from "@/components/shared/ProductList"

export default async function Homepage({ searchParams }: { searchParams: Promise<{ category: string }> }) {
    const category = (await searchParams).category
    return (
        <div>

            <ProductList category={category} params="products"/>


        </div>
        )
}