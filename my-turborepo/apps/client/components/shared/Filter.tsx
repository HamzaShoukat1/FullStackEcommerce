"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

export default function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
 
      const filterChange = useCallback(
        (value: string) => {
          const params = new URLSearchParams(searchParams);
          params.set("sort", value || "newest");
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
      );
    return (
        <div className="flex  items-center justify-end mb-3 gap-1 text-gray-500 text-sm">
            <span>Sort by:</span>
            <select onChange={(e)=>filterChange(e.target.value)} name="sort" id="sort" className="cursor-pointer  ring-1 ring-gray-200 shadow-md p-1 rounded-sm">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>

            </select>
        </div>
    )
}
