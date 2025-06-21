import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample product data
const products = [
  {
    id: 2,
    name: "Handwoven Textile",
    description: "Naturally dyed cotton textile with traditional Rathwa patterns",
    price: 3500,
    image: "/placeholder.svg?height=400&width=400",
    artist: "Savita Rathwa",
    category: "Textiles",
    featured: true,
    certified: true,
  },
  {
    id: 3,
    name: "Wooden Sculpture",
    description: "Hand-carved wooden sculpture representing tribal deities",
    price: 8000,
    image: "/placeholder.svg?height=400&width=400",
    artist: "Bharat Rathwa",
    category: "Sculptures",
    featured: true,
    certified: true,
  },
  {
    id: 4,
    name: "Tribal Jewelry Set",
    description: "Traditional silver and beadwork jewelry set",
    price: 5500,
    image: "/placeholder.svg?height=400&width=400",
    artist: "Leela Rathwa",
    category: "Jewelry",
    featured: true,
    certified: true,
  },
  {
    id: 5,
    name: "Clay Pottery",
    description: "Hand-crafted clay pot with traditional Rathwa motifs",
    price: 2800,
    image: "/placeholder.svg?height=400&width=400",
    artist: "Meena Rathwa",
    category: "Pottery",
    featured: false,
    certified: true,
  },
]

export default function ProductRecommendations({ currentProductId }: { currentProductId: number }) {
  // Filter out the current product and show only 4 recommendations
  const recommendations = products.filter((product) => product.id !== currentProductId).slice(0, 4)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {recommendations.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            <div className="absolute right-2 top-2">
              {product.certified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Certified
                </Badge>
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold">{product.name}</h3>
              <span className="font-medium">₹{product.price.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <p className="mt-2 text-sm">
              By{" "}
              <Link
                href={`/artisans/${product.artist.toLowerCase().replace(" ", "-")}`}
                className="text-primary hover:underline"
              >
                {product.artist}
              </Link>
            </p>
          </CardContent>
          <CardFooter className="flex gap-2 p-4 pt-0">
            <Button size="sm" variant="outline" className="flex-1" asChild>
              <Link href={`/product/${product.id}`}>View Details</Link>
            </Button>
            <Button size="sm" className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

