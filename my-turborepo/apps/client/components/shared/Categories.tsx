"use client";

import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const categories = [
  { name: "All", icon: <ShoppingBasket className="w-4 h-4" />, slug: "all" },
  { name: "T-shirts", icon: <Shirt className="w-4 h-4" />, slug: "t-shirts" },
  { name: "Shoes", icon: <Footprints className="w-4 h-4" />, slug: "shoes" },
  { name: "Accessories", icon: <Glasses className="w-4 h-4" />, slug: "accessories" },
  { name: "Bags", icon: <Briefcase className="w-4 h-4" />, slug: "bags" },
  { name: "Dresses", icon: <Venus className="w-4 h-4" />, slug: "dresses" },
  { name: "Jackets", icon: <Shirt className="w-4 h-4" />, slug: "jackets" },
  { name: "Gloves", icon: <Hand className="w-4 h-4" />, slug: "gloves" },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = useMemo(() => searchParams.get("category"), [searchParams]);
  
  const handleChange = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams);
      params.set("category", value || "all");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="grid w-full gap-2 grid-cols-[repeat(auto-fill,minmax(90px,1fr))] bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "text-gray-500" : ""
          }`}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;