"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import ARViewer from "@/components/ar-viewer"
import BlockchainCertificate from "@/components/blockchain-certificate"
import ProductRecommendations from "@/components/product-recommendations"

// This would normally come from a database
const getProduct = (id: string) => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Pithora Painting - Creation Story",
      description:
        "This traditional Pithora painting depicts the creation story of the Rathwa tribe. Created using natural pigments on handmade canvas, this piece showcases the distinctive style and cultural significance of Pithora art. Each element in the painting has symbolic meaning related to tribal mythology and beliefs.",
      longDescription:
        "Pithora paintings are not just art but a sacred tradition among the Rathwa tribe. This particular piece depicts the creation story, showing how the world came into being according to tribal mythology. The painting features divine horses, human figures, and various symbols representing natural elements.\n\nThe artist has used only natural pigments derived from minerals, plants, and clay found in the Rajpipla region. The painting process involved traditional rituals and prayers, as is customary when creating sacred Pithora art.\n\nThis authentic piece comes with certification of origin and is a rare opportunity to own a piece of living tribal heritage. The painting not only serves as a beautiful decorative piece but also as a documentation of oral traditions and beliefs that have been passed down through generations.",
      price: 15000,
      discountedPrice: 12500,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      artist: {
        id: 1,
        name: "Ramesh Rathwa",
        image: "/placeholder.svg?height=100&width=100",
      },
      category: "Paintings",
      dimensions: "60cm x 90cm",
      weight: "1.2kg",
      materials: ["Natural pigments", "Handmade canvas", "Traditional binding agents"],
      careInstructions: "Keep away from direct sunlight and moisture. Clean with dry, soft cloth only.",
      story:
        "This painting depicts the Rathwa creation myth where the divine horse Pithora Baba brings prosperity and good fortune. The ritual of creating this painting is believed to bring blessings to the household.",
      certified: true,
      inStock: true,
      rating: 4.8,
      reviews: 12,
      features: [
        "100% handmade using traditional techniques",
        "Created with natural pigments sourced locally",
        "Comes with certificate of authenticity",
        "Includes detailed information about symbolism and meaning",
        "Packaged in eco-friendly materials",
      ],
      blockchain: {
        transactionHash: "0x7d9c5f6d7288a7f3b23d6f17f7819d6766f9493a1a0c51762119b318a80d5aeb",
        network: "Polygon",
        creationDate: "2023-09-15",
      },
      modelUrl: "/assets/3d/duck.glb", // This would be a real 3D model in production
    },
    // Other products would be here
  ]

  return products.find((p) => p.id === Number.parseInt(id)) || products[0]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const product = getProduct(params.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.certified && (
              <Badge className="absolute right-3 top-3 bg-green-100 text-green-800">Certified Authentic</Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, idx) => (
              <button
                key={idx}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                  selectedImage === idx ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(idx)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
              <span className="ml-1 text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Link href={`/artisans/${product.artist.id}`} className="flex items-center hover:underline">
                <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={product.artist.image || "/placeholder.svg"}
                    alt={product.artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>By {product.artist.name}</span>
              </Link>
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          <div className="mb-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹{product.discountedPrice.toLocaleString()}</span>
            {product.discountedPrice < product.price && (
              <span className="text-lg text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
            )}
            {product.discountedPrice < product.price && (
              <Badge variant="outline" className="ml-2 bg-red-50 text-red-600">
                Save {Math.round((1 - product.discountedPrice / product.price) * 100)}%
              </Badge>
            )}
          </div>

          <div className="mb-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-green-600" />
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-green-600" />
              <span>Free shipping within India</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-green-600" />
              <span>Blockchain-verified authenticity certificate</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center">
              <span className="mr-4 font-medium">Quantity</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex h-8 w-10 items-center justify-center border-y text-sm">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8 flex gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <ARViewer productId={product.id} productName={product.name} modelUrl={product.modelUrl} />
            <BlockchainCertificate
              productId={product.id}
              productName={product.name}
              artisanName={product.artist.name}
              creationDate={product.blockchain.creationDate}
              transactionHash={product.blockchain.transactionHash}
              blockchainNetwork={product.blockchain.network}
            />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="story" className="flex-1">
                Cultural Story
              </TabsTrigger>
              <TabsTrigger value="care" className="flex-1">
                Care Instructions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Dimensions</h3>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h3 className="font-medium">Weight</h3>
                  <p className="text-muted-foreground">{product.weight}</p>
                </div>
                <div>
                  <h3 className="font-medium">Materials</h3>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {product.materials.map((material, idx) => (
                      <li key={idx}>{material}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Features</h3>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="story" className="mt-4">
              <div className="space-y-4 text-muted-foreground">
                {product.longDescription.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-4">
              <p className="text-muted-foreground">{product.careInstructions}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">You May Also Like</h2>
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  )
}

