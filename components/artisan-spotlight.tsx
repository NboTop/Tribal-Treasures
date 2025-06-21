import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
]

export default function ArtisanSpotlight() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            <h3 className="text-xl font-semibold">{artisan.name}</h3>
            <p className="text-primary">{artisan.specialty}</p>
            <p className="text-sm text-muted-foreground">{artisan.location}</p>

            <div className="my-4 flex justify-between text-sm">
              <div>
                <p className="font-medium">{artisan.products}</p>
                <p className="text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="font-medium">{artisan.yearsOfExperience}</p>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
            </div>

            <p className="mb-4 text-sm">{artisan.story}</p>

            <Button variant="outline" className="w-full" asChild>
              <Link href={`/artisans/${artisan.id}`}>View Profile</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

