"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Package, ShoppingBag, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("products")
  const isMobile = useIsMobile()

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Artisan Dashboard</h1>
          <p className="text-muted-foreground">Manage your products, track sales, and connect with customers</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/add-product">Add New Product</Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 new customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Techniques Documented</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Your sales performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex h-full items-end gap-2">
              {[40, 65, 50, 80, 95, 70].map((height, i) => (
                <div key={i} className="relative flex h-full flex-1 flex-col justify-end">
                  <div className="bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                  <span className="mt-2 text-center text-xs">{["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="products">Recent Products</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage your product listings and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: "Pithora Painting - Creation Story",
                    price: 12500,
                    image: "/placeholder.svg?height=100&width=100",
                    status: "In Stock",
                    views: 245,
                    sales: 8,
                  },
                  {
                    id: 2,
                    name: "Pithora Painting - Harvest Festival",
                    price: 9800,
                    image: "/placeholder.svg?height=100&width=100",
                    status: "In Stock",
                    views: 187,
                    sales: 5,
                  },
                  {
                    id: 3,
                    name: "Pithora Painting - Tribal Deities",
                    price: 15000,
                    image: "/placeholder.svg?height=100&width=100",
                    status: "Low Stock",
                    views: 320,
                    sales: 12,
                  },
                  {
                    id: 4,
                    name: "Pithora Painting - Wedding Ceremony",
                    price: 11200,
                    image: "/placeholder.svg?height=100&width=100",
                    status: "In Stock",
                    views: 156,
                    sales: 3,
                  },
                ].map((product) => (
                  <div key={product.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge
                            variant={product.status === "In Stock" ? "outline" : "secondary"}
                            className={product.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" : ""}
                          >
                            {product.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{product.views} views</span>
                          <span className="text-xs text-muted-foreground">{product.sales} sold</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/edit-product/${product.id}`}>Edit</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/product/${product.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/products">View All Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-5723",
                    customer: "Anita Sharma",
                    date: "2023-10-15",
                    amount: 12500,
                    status: "Delivered",
                    items: 1,
                  },
                  {
                    id: "ORD-5698",
                    customer: "Rajiv Mehta",
                    date: "2023-10-12",
                    amount: 27800,
                    status: "Shipped",
                    items: 2,
                  },
                  {
                    id: "ORD-5682",
                    customer: "Priya Patel",
                    date: "2023-10-08",
                    amount: 15000,
                    status: "Processing",
                    items: 1,
                  },
                  {
                    id: "ORD-5671",
                    customer: "Vikram Singh",
                    date: "2023-10-05",
                    amount: 9800,
                    status: "Delivered",
                    items: 1,
                  },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "outline"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "default"
                          }
                          className={
                            order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                                ? "bg-green-100 text-green-800"
                                : ""
                          }
                        >
                          {order.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                      <Button size="sm" variant="ghost" className="mt-1" asChild>
                        <Link href={`/dashboard/orders/${order.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/orders">View All Orders</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

