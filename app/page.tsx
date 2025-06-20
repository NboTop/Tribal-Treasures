import Link from "next/link"
import { ArrowRight, Search, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedProducts from "@/components/featured-products"
import ArtisanSpotlight from "@/components/artisan-spotlight"
import HeritageBanner from "@/components/heritage-banner"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">Tribal Treasures</h1>
          <p className="mb-8 max-w-2xl text-xl">
            Preserving and celebrating the unique artistic heritage of the Rathwa tribal community
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" asChild>
              <Link href="/shop">
                Explore Crafts <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/artisans">
                Meet the Artisans <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for crafts, techniques, or artisans..." className="pl-10 py-6 text-lg" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {["Paintings", "Textiles", "Pottery", "Jewelry", "Woodwork", "Sculptures", "Home Decor", "All"].map(
                (category) => (
                  <Button key={category} variant="outline" className="h-auto py-3 text-center" asChild>
                    <Link href={`/shop?category=${category.toLowerCase()}`}>{category}</Link>
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">Featured Crafts</h2>
          <FeaturedProducts />
          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/shop">View All Crafts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Heritage Preservation */}
      <HeritageBanner />

      {/* Artisan Spotlight */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">Meet Our Artisans</h2>
          <ArtisanSpotlight />
          <div className="mt-10 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/artisans">
                View All Artisans <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Impact</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "120+", label: "Artisans Supported" },
              { number: "1,500+", label: "Products Sold" },
              { number: "35%", label: "Income Increase" },
              { number: "250+", label: "Techniques Documented" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold">{stat.number}</p>
                <p className="mt-2 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

