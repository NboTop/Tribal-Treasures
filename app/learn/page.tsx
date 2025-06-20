import Image from "next/image"
import { BookOpen, Clock, Play, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample learning modules data
const modules = [
  {
    id: 1,
    title: "Introduction to Pithora Painting",
    description: "Learn the basics of this sacred art form and its cultural significance",
    image: "/placeholder.svg?height=400&width=600",
    instructor: "Ramesh Rathwa",
    duration: "4 hours",
    level: "Beginner",
    enrolled: 45,
    progress: 0,
  },
  {
    id: 2,
    title: "Natural Dye Preparation",
    description: "Traditional methods for creating vibrant, natural dyes from local materials",
    image: "/placeholder.svg?height=400&width=600",
    instructor: "Savita Rathwa",
    duration: "3 hours",
    level: "Intermediate",
    enrolled: 32,
    progress: 25,
  },
  {
    id: 3,
    title: "Traditional Weaving Techniques",
    description: "Master the art of creating geometric patterns in traditional textiles",
    image: "/placeholder.svg?height=400&width=600",
    instructor: "Savita Rathwa",
    duration: "6 hours",
    level: "Advanced",
    enrolled: 28,
    progress: 0,
  },
  {
    id: 4,
    title: "Wood Carving Fundamentals",
    description: "Learn to use traditional tools to create tribal sculptures and artifacts",
    image: "/placeholder.svg?height=400&width=600",
    instructor: "Bharat Rathwa",
    duration: "8 hours",
    level: "Intermediate",
    enrolled: 19,
    progress: 75,
  },
]

export default function LearnPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-bold">Learning Center</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Preserving traditional knowledge through interactive learning modules
      </p>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.id} className="overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={module.image || "/placeholder.svg"} alt={module.title} fill className="object-cover" />
                  <Badge className="absolute left-3 top-3">{module.level}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{module.title}</h3>
                  <p className="text-muted-foreground">{module.description}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{module.enrolled} enrolled</span>
                    </div>
                  </div>

                  <div className="mt-4 text-sm">
                    <p>Instructor: {module.instructor}</p>
                    {module.progress > 0 && (
                      <div className="mt-2">
                        <div className="mb-1 flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 p-6 pt-0">
                  {module.progress > 0 ? (
                    <Button className="flex-1">
                      <Play className="mr-2 h-4 w-4" /> Continue Learning
                    </Button>
                  ) : (
                    <Button className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" /> Start Course
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inprogress" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules
              .filter((m) => m.progress > 0 && m.progress < 100)
              .map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={module.image || "/placeholder.svg"} alt={module.title} fill className="object-cover" />
                    <Badge className="absolute left-3 top-3">{module.level}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{module.title}</h3>
                    <p className="text-muted-foreground">{module.description}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{module.enrolled} enrolled</span>
                      </div>
                    </div>

                    <div className="mt-4 text-sm">
                      <p>Instructor: {module.instructor}</p>
                      <div className="mt-2">
                        <div className="mb-1 flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 p-6 pt-0">
                    <Button className="flex-1">
                      <Play className="mr-2 h-4 w-4" /> Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">You haven't completed any courses yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

