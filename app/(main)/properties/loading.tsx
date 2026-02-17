import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-card/50">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-16 w-full max-w-lg" />
            <Skeleton className="h-16 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-sm" />
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Skeleton */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="space-y-8">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-[500px] w-full" />
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0">
            {/* Tabs Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-12 pb-6 border-b border-border">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-64" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="space-y-6">
                  <Skeleton className="aspect-[4/5] w-full" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <Skeleton className="h-8 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between pt-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
