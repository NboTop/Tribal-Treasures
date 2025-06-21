"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Sample product data
const products = [
  {
    id: 1,
    name: "Pithora Painting",
    description: "Traditional Rathwa wall painting depicting mythological stories",
    price: 12500,
    image: "/placeholder.svg?height=400&width=400",
    artist: "Ramesh Rathwa",
    category: "Paintings",
    featured: true,
    certified: true,
  },
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
]

export default function FeaturedProducts() {
  const { toast } = useToast()
  const [isARViewOpen, setIsARViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | number>(null)

  const handleAddToCart = (productId: number) => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart",
    })
  }

  const openARView = (productId: number) => {
    setSelectedProduct(productId)
    setIsARViewOpen(true)
    toast({
      title: "AR View",
      description: "AR functionality would launch here to visualize the product in your space",
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
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
                  Certified Authentic
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
            <Button variant="outline" size="sm" className="flex-1" onClick={() => openARView(product.id)}>
              <Eye className="mr-2 h-4 w-4" /> AR View
            </Button>
            <Button size="sm" className="flex-1" onClick={() => handleAddToCart(product.id)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

