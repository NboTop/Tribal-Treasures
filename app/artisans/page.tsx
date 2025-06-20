import Image from "next/image"
import Link from "next/link"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample artisan data
const artisans = [
  {
    id: 1,
    name: "Ramesh Rathwa",
    specialty: "Pithora Painting",
    location: "Rajpipla, Gujarat",
    story:
      "A third-generation Pithora painter who learned the art from his grandfather. His work has been exhibited in national galleries.",
    image: "/placeholder.svg?height=400&width=400",
    products: 24,
    yearsOfExperience: 35,
  },
  {
    id: 2,
    name: "Savita Rathwa",
    specialty: "Textile Weaving",
    location: "Dediapada, Gujarat",
    story:
      "Specializes in traditional weaving techniques using natural dyes. She leads a women's cooperative that supports 15 families.",
    image: "/placeholder.svg?height=400&width=400",
    products: 42,
    yearsOfExperience: 28,
  },
  {
    id: 3,
    name: "Bharat Rathwa",
    specialty: "Wood Carving",
    location: "Chhota Udepur, Gujarat",
    story:
      "A master wood carver who creates intricate sculptures depicting tribal folklore and deities using traditional tools.",
    image: "/placeholder.svg?height=400&width=400",
    products: 18,
    yearsOfExperience: 40,
  },
  {
    id: 4,
    name: "Leela Rathwa",
    specialty: "Jewelry Making",
    location: "Kawant, Gujarat",
    story:
      "Creates traditional silver and beadwork jewelry using techniques passed down through generations in her family.",
    image: "/placeholder.svg?height=400&width=400",
    products: 36,
    yearsOfExperience: 25,
  },
  {
    id: 5,
    name: "Suresh Rathwa",
    specialty: "Bamboo Crafts",
    location: "Naswadi, Gujarat",
    story:
      "Specializes in creating intricate bamboo baskets and decorative items using sustainable harvesting practices.",
    image: "/placeholder.svg?height=400&width=400",
    products: 29,
    yearsOfExperience: 32,
  },
  {
    id: 6,
    name: "Meena Rathwa",
    specialty: "Pottery",
    location: "Chhota Udepur, Gujarat",
    story:
      "Creates traditional clay pottery with distinctive Rathwa motifs using locally sourced clay and natural pigments.",
    image: "/placeholder.svg?height=400&width=400",
    products: 21,
    yearsOfExperience: 30,
  },
]

export default function ArtisansPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-bold">Meet Our Artisans</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Connect directly with the skilled craftspeople behind our unique tribal art
      </p>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search artisans by name or craft..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filter by Craft</Button>
          <Button variant="outline">Filter by Region</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artisans.map((artisan) => (
          <Card key={artisan.id} className="overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={artisan.image || "/placeholder.svg"}
                alt={artisan.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{artisan.name}</h3>
                <Badge>{artisan.specialty}</Badge>
              </div>

              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{artisan.location}</span>
              </div>

              <p className="mb-4 text-sm">{artisan.story}</p>

              <div className="mb-4 flex justify-between text-sm">
                <div>
                  <p className="font-medium">{artisan.products}</p>
                  <p className="text-muted-foreground">Products</p>
                </div>
                <div>
                  <p className="font-medium">{artisan.yearsOfExperience}</p>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
              </div>

              <Button className="w-full" asChild>
                <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

