import { Suspense } from "react"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import ProductGrid from "@/components/product-grid"
import ProductSkeleton from "@/components/product-skeleton"

export default function ShopPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop Tribal Crafts</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md">
          <Input placeholder="Search products..." className="pl-10" />
          <Filter className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        </div>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="hidden lg:block">
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <div className="space-y-2">
              {["Paintings", "Textiles", "Pottery", "Jewelry", "Woodwork", "Sculptures", "Home Decor"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.toLowerCase()}`} />
                    <label htmlFor={`category-${category.toLowerCase()}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ),
              )}
            </div>

            <div className="my-6 border-t pt-6">
              <h2 className="mb-4 text-lg font-semibold">Price Range</h2>
              <Slider defaultValue={[1000, 15000]} min={500} max={25000} step={500} />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>₹500</span>
                <span>₹25,000</span>
              </div>
            </div>

            <div className="my-6 border-t pt-6">
              <h2 className="mb-4 text-lg font-semibold">Artisan</h2>
              <div className="space-y-2">
                {["Ramesh Rathwa", "Savita Rathwa", "Bharat Rathwa", "Leela Rathwa"].map((artisan) => (
                  <div key={artisan} className="flex items-center space-x-2">
                    <Checkbox id={`artisan-${artisan.toLowerCase().replace(" ", "-")}`} />
                    <label htmlFor={`artisan-${artisan.toLowerCase().replace(" ", "-")}`} className="text-sm">
                      {artisan}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-6 border-t pt-6">
              <h2 className="mb-4 text-lg font-semibold">Certification</h2>
              <div className="flex items-center space-x-2">
                <Checkbox id="certified" />
                <label htmlFor="certified" className="text-sm">
                  Authenticity Certified
                </label>
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<ProductSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

