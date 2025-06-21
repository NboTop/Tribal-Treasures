"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, Home, LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
      subItems: [
        { title: "All Products", href: "/dashboard/products" },
        { title: "Add Product", href: "/dashboard/add-product" },
        { title: "Categories", href: "/dashboard/categories" },
      ],
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Repository",
      href: "/dashboard/repository",
      icon: BookOpen,
      subItems: [
        { title: "My Techniques", href: "/dashboard/repository/techniques" },
        { title: "Add Technique", href: "/dashboard/repository/add" },
      ],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-4">
              <Package className="h-6 w-6" />
              <span className="font-semibold">Tribal Treasures</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.href}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.href}>
                              <Link href={subItem.href}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Website
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Help
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="container py-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}

