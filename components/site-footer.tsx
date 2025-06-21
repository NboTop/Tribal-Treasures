import Link from "next/link"
import { Facebook, Instagram, Package2, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Tribal Treasures</span>
            </Link>
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">
              Preserving and celebrating the unique artistic heritage of tribal communities through technology and
              commerce.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=paintings" className="text-muted-foreground hover:text-foreground">
                  Paintings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=textiles" className="text-muted-foreground hover:text-foreground">
                  Textiles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sculptures" className="text-muted-foreground hover:text-foreground">
                  Sculptures
                </Link>
              </li>
              <li>
                <Link href="/shop?category=jewelry" className="text-muted-foreground hover:text-foreground">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/repository" className="text-muted-foreground hover:text-foreground">
                  Digital Repository
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground">
                  Learning Modules
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-muted-foreground hover:text-foreground">
                  Artisan Stories
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tribal Treasures. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Subscribe to our newsletter</span>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" className="h-8" />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

