import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, MessageCircle, Share2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would normally come from a database
const getArtisan = (id: string) => {
  // Sample artisan data
  const artisans = [
    {
      id: 1,
      name: "Ramesh Rathwa",
      specialty: "Pithora Painting",
      location: "Rajpipla, Gujarat",
      story:
        "Ramesh Rathwa is a third-generation Pithora painter from the Rathwa tribal community in Rajpipla. He learned this sacred art form from his grandfather at the age of 12 and has been practicing for over 35 years. His paintings depict the rich mythology and cultural traditions of his community, using natural pigments derived from local minerals and plants.\n\nRamesh's work has been exhibited in several national galleries and has received recognition for its authentic representation of tribal art. He is passionate about preserving this traditional art form and regularly conducts workshops to teach younger generations.",
      image: "/placeholder.svg?height=600&width=600",
      coverImage: "/placeholder.svg?height=400&width=1200",
      products: 24,
      yearsOfExperience: 35,
      awards: ["National Tribal Art Award (2015)", "Gujarat State Craft Excellence Award (2018)"],
      exhibitions: [
        "National Museum, New Delhi (2019)",
        "Tribal Art Gallery, Mumbai (2020)",
        "International Folk Art Festival, Jaipur (2022)",
      ],
      techniques: ["Traditional Pithora wall painting", "Natural pigment preparation", "Ritual painting ceremonies"],
      gallery: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      productSamples: [
        {
          id: 101,
          name: "Pithora Creation Story",
          price: 15000,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          id: 102,
          name: "Harvest Festival Celebration",
          price: 12500,
          image: "/placeholder.svg?height=400&width=400",
        },
        {
          id: 103,
          name: "Tribal Deities",
          price: 18000,
          image: "/placeholder.svg?height=400&width=400",
        },
      ],
    },
    // Other artisans would be here
  ]

  return artisans.find((a) => a.id === Number.parseInt(id)) || artisans[0]
}

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = getArtisan(params.id)

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-64 w-full md:h-80">
        <Image
          src={artisan.coverImage || "/placeholder.svg"}
          alt={`${artisan.name} cover image`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container relative z-10 flex h-full items-end pb-6">
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-4 bg-black/20 text-white backdrop-blur-sm"
            asChild
          >
            <Link href="/artisans">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Artisans
            </Link>
          </Button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="relative -mt-20 mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-background md:-mt-24 md:h-48 md:w-48">
              <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
            </div>

            <h1 className="mb-1 text-3xl font-bold">{artisan.name}</h1>
            <div className="mb-4 flex items-center gap-2">
              <Badge>{artisan.specialty}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{artisan.location}</span>
              </div>
            </div>

            <div className="mb-6 flex gap-2">
              <Button className="flex-1">
                <MessageCircle className="mr-2 h-4 w-4" /> Contact
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Experience</h3>
                <div className="flex justify-between">
                  <div>
                    <p className="text-2xl font-bold">{artisan.yearsOfExperience}</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{artisan.products}</p>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{artisan.awards.length}</p>
                    <p className="text-sm text-muted-foreground">Awards</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Techniques</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {artisan.techniques.map((technique, idx) => (
                    <li key={idx}>{technique}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Exhibitions & Awards</h3>
                <div className="mb-3">
                  <h4 className="text-sm font-medium">Awards</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {artisan.awards.map((award, idx) => (
                      <li key={idx}>{award}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Exhibitions</h4>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {artisan.exhibitions.map((exhibition, idx) => (
                      <li key={idx}>{exhibition}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="story">
              <TabsList className="mb-6">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
              </TabsList>

              <TabsContent value="story">
                <h2 className="mb-4 text-2xl font-semibold">About {artisan.name}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {artisan.story.split("\n\n").map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <h2 className="mb-4 text-2xl font-semibold">Work Gallery</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {artisan.gallery.map((image, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${artisan.name}'s work ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="products">
                <div className="flex items-center justify-between">
                  <h2 className="mb-4 text-2xl font-semibold">Available Products</h2>
                  <Button asChild>
                    <Link href={`/shop?artist=${artisan.id}`}>
                      <ShoppingBag className="mr-2 h-4 w-4" /> View All
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {artisan.productSamples.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="font-semibold">{product.name}</h3>
                          <span>₹{product.price.toLocaleString()}</span>
                        </div>
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

