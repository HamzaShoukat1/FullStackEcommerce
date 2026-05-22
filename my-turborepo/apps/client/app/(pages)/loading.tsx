// app/dashboard/products/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" /> {/* Title: "Products" */}
        <Skeleton className="h-9 w-32 rounded-md" /> 
      </div>

      {/* Table Container Layout */}
      <div className="rounded-md border border-neutral-200 dark:border-neutral-800">
        
        {/* Table Header Row (6 Column Matrix adapted for Product Specs) */}
        <div className="grid grid-cols-[60px_2fr_1fr_1fr_1.5fr_100px] gap-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4">
          <Skeleton className="h-4 w-10" />      {/* Image Column */}
          <Skeleton className="h-4 w-[40%]" />   {/* Name / Description Column */}
          <Skeleton className="h-4 w-[60%]" />   {/* Price Column */}
          <Skeleton className="h-4 w-[70%]" />   {/* Category Column */}
          <Skeleton className="h-4 w-[50%]" />   {/* Inventory Variations Column */}
          <Skeleton className="h-4 w-12 justify-self-end" /> {/* Actions / Selection Trigger Column */}
        </div>

        {/* Table Body Rows (Renders 5 row entry blocks concurrently) */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-[60px_2fr_1fr_1fr_1.5fr_100px] gap-4 p-4 items-center">
              {/* Product Thumbnail Block */}
              <Skeleton className="h-10 w-10 rounded-md" />

              {/* Product Info Block (Name + Small Subtext description wrapper) */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-3 w-[55%]" />
              </div>

              {/* Price Numeric Block */}
              <Skeleton className="h-4 w-14" />

              {/* Category Badge Layout */}
              <Skeleton className="h-5 w-20 rounded-full" />

              {/* Colors & Sizes Chips Indicators */}
              <div className="flex gap-1.5 flex-wrap">
                <Skeleton className="h-4 w-8 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
                <Skeleton className="h-4 w-8 rounded" />
              </div>

              {/* Action Dropdown / Trash Bin Buttons Wrapper */}
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
