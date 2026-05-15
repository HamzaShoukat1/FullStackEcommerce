// app/dashboard/products/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-6 space-y-4">
            {/* Title Placeholder */}
            <Skeleton className="h-8 w-37.5" />

            {/* Table Container */}
            <div className="rounded-md border border-neutral-200 dark:border-neutral-800">

                {/* Table Header Row (4 Columns) */}
                <div className="grid grid-cols-4 gap-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-4">
                    <Skeleton className="h-4 w-[60%]" />
                    <Skeleton className="h-4 w-[50%]" />
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[40%]" />
                </div>

                {/* Table Body Rows (5 Content Rows) */}
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 p-4 items-center">
                            <Skeleton className="h-8 w-[85%]" />
                            <Skeleton className="h-8 w-[65%]" />
                            <Skeleton className="h-8 w-[45%]" />
                            <Skeleton className="h-8 w-[45%]" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
