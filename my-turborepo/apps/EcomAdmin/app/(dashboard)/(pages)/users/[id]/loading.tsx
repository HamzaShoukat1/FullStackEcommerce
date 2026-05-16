// app/dashboard/products/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* 🥖 Breadcrumb / Title Skeleton */}
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-24" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-5 w-32" />
        <span className="text-muted-foreground">/</span>
        <Skeleton className="h-5 w-40" />
      </div>

      {/* 📦 TWO-COLUMN DASHBOARD GRID */}
      <div className="mt-4 flex flex-col xl:flex-row gap-8">
        
        {/* 📋 LEFT: PROFILE & DETAILS PANEL (1/3 Width) */}
        <div className="w-full xl:w-1/3 space-y-6">
          {/* Card 1: Main Status Card */}
          <div className="bg-primary-foreground p-5 rounded-lg border space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" /> {/* Thumbnail image */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-3/4" /> {/* Product Name */}
                <Skeleton className="h-4 w-1/4" /> {/* Category Badge */}
              </div>
            </div>
            <Skeleton className="h-16 w-full" /> {/* Long Description placeholder */}
          </div>

          {/* Card 2: Core Inventory Information */}
          <div className="bg-primary-foreground p-5 rounded-lg border space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <Skeleton className="h-6 w-1/3" /> {/* Header text */}
              <Skeleton className="h-8 w-20 rounded-md" /> {/* Edit action button */}
            </div>

            {/* Simulated Data Fields rows */}
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📊 RIGHT: BIG METRICS & GRAPH CHARTS PANEL (2/3 Width) */}
        <div className="w-full xl:w-2/3 space-y-6">
          <div className="bg-primary-foreground p-5 rounded-lg border space-y-4">
            {/* Chart Title and Date Filter controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" /> {/* Chart Heading */}
                <Skeleton className="h-4 w-32" /> {/* Subtitle context */}
              </div>
              <Skeleton className="h-9 w-36 rounded-md" /> {/* Timeline filter selector */}
            </div>

            {/* Big Analytics Canvas Body */}
            <div className="pt-4 min-h-87 flex flex-col justify-between">
              {/* Simulated Chart Bars/Lines block area */}
              <Skeleton className="h-70 w-full rounded-md" />
              
              {/* Horizontal X-Axis Ticks Legend indicators */}
              <div className="flex justify-between px-2 pt-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-10" />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
