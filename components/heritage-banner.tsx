import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Video } from "lucide-react"

export default function HeritageBanner() {
  return (
    <section className="bg-[url('/placeholder.svg?height=600&width=1600')] bg-cover bg-center py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-lg bg-black/70 p-8 text-center text-white backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold">Preserving Cultural Heritage</h2>
          <p className="mb-6 text-lg">
            Our digital repository documents traditional techniques, designs, and stories from the Rathwa community,
            ensuring these treasures are preserved for future generations.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/repository">
                <BookOpen className="mr-2 h-5 w-5" /> Explore Repository
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/learn">
                <Video className="mr-2 h-5 w-5" /> Learning Modules
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

