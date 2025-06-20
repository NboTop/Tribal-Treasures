import Image from "next/image"
import Link from "next/link"
import { BookOpen, Download, Play, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample repository data
const techniques = [
  {
    id: 1,
    title: "Pithora Painting Technique",
    description: "Traditional wall painting technique using natural pigments",
    image: "/placeholder.svg?height=400&width=600",
    category: "Painting",
    documentedBy: "Dr. Meena Sharma",
    date: "2023-05-15",
    resources: ["Video Tutorial", "PDF Guide", "Historical Context"],
  },
  {
    id: 2,
    title: "Traditional Weaving Patterns",
    description: "Documentation of geometric patterns used in Rathwa textiles",
    image: "/placeholder.svg?height=400&width=600",
    category: "Textiles",
    documentedBy: "Tribal Arts Research Team",
    date: "2023-07-22",
    resources: ["Pattern Library", "Video Demonstration", "Historical Context"],
  },
  {
    id: 3,
    title: "Wood Carving Tools and Methods",
    description: "Traditional tools and techniques for tribal wood sculptures",
    image: "/placeholder.svg?height=400&width=600",
    category: "Sculpture",
    documentedBy: "Bharat Rathwa & Research Team",
    date: "2023-04-10",
    resources: ["Tool Guide", "Video Tutorial", "Technique Documentation"],
  },
  {
    id: 4,
    title: "Natural Dye Preparation",
    description: "Process of creating natural dyes from local plants and minerals",
    image: "/placeholder.svg?height=400&width=600",
    category: "Textiles",
    documentedBy: "Savita Rathwa & Research Team",
    date: "2023-08-05",
    resources: ["Dye Recipes", "Video Demonstration", "Plant Identification Guide"],
  },
]

const stories = [
  {
    id: 1,
    title: "The Legend of Pithora Baba",
    description: "Origin story behind the sacred Pithora paintings",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mythology",
    narratedBy: "Elder Ramesh Rathwa",
    date: "2023-03-12",
    resources: ["Audio Recording", "Illustrated Story", "Cultural Context"],
  },
  {
    id: 2,
    title: "Harvest Festival Traditions",
    description: "Documentation of seasonal celebrations and associated crafts",
    image: "/placeholder.svg?height=400&width=600",
    category: "Cultural Practices",
    narratedBy: "Community Elders",
    date: "2023-06-18",
    resources: ["Video Documentation", "Festival Calendar", "Ritual Objects Guide"],
  },
  {
    id: 3,
    title: "Songs of the Rathwa People",
    description: "Collection of traditional songs with translations and context",
    image: "/placeholder.svg?height=400&width=600",
    category: "Music",
    narratedBy: "Various Community Members",
    date: "2023-09-05",
    resources: ["Audio Recordings", "Lyrics Transcription", "Musical Notation"],
  },
]

export default function RepositoryPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-bold">Digital Heritage Repository</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Preserving the cultural knowledge and artistic techniques of the Rathwa community
      </p>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search the repository..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Advanced Search</Button>
          <Button>Contribute Knowledge</Button>
        </div>
      </div>

      <Tabs defaultValue="techniques" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="techniques">Techniques & Designs</TabsTrigger>
          <TabsTrigger value="stories">Stories & Cultural Context</TabsTrigger>
        </TabsList>

        <TabsContent value="techniques" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {techniques.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <Badge className="absolute left-3 top-3">{item.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.resources.map((resource, idx) => (
                      <Badge key={idx} variant="outline">
                        {resource}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Documented by: {item.documentedBy}</p>
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-6 pt-0">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/repository/techniques/${item.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" /> View Details
                    </Link>
                  </Button>
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {stories.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <Badge className="absolute left-3 top-3">{item.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.resources.map((resource, idx) => (
                      <Badge key={idx} variant="outline">
                        {resource}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Narrated by: {item.narratedBy}</p>
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-6 pt-0">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/repository/stories/${item.id}`}>
                      <BookOpen className="mr-2 h-4 w-4" /> Read Story
                    </Link>
                  </Button>
                  <Button className="flex-1">
                    <Play className="mr-2 h-4 w-4" /> Listen
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

