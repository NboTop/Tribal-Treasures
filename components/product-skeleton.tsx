import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </CardContent>
          <CardFooter className="flex gap-2 p-4 pt-0">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

