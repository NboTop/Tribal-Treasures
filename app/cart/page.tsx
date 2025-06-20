"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import PaymentGateway from "@/components/payment-gateway"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Pithora Painting - Creation Story",
    price: 12500,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    artist: "Ramesh Rathwa",
  },
  {
    id: 2,
    name: "Handwoven Textile",
    price: 3500,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    artist: "Savita Rathwa",
  },
  {
    id: 3,
    name: "Tribal Jewelry Set",
    price: 5500,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    artist: "Leela Rathwa",
  },
]

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 250
  const tax = Math.round(subtotal * 0.18) // 18% GST
  const total = subtotal + shipping + tax

  const handlePaymentComplete = () => {
    setCheckoutStep("confirmation")
  }

  if (cartItems.length === 0 && checkoutStep === "cart") {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-md text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button className="mt-6" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (checkoutStep === "confirmation") {
    return (
      <div className="container py-12">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="mt-6 rounded-lg border p-4 text-left">
            <p className="font-medium">Order #TT-12345</p>
            <p className="text-sm text-muted-foreground">Confirmation has been sent to your email.</p>
          </div>
          <Button className="mt-6" asChild>
            <Link href="/dashboard/orders">View Order Status</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {checkoutStep === "cart" && (
            <>
              <h1 className="mb-6 text-2xl font-bold">Your Cart ({cartItems.length})</h1>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">By {item.artist}</p>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="flex h-7 w-8 items-center justify-center border-y text-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price.toLocaleString()}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-muted-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()} total
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {checkoutStep === "shipping" && (
            <>
              <h1 className="mb-6 text-2xl font-bold">Shipping Information</h1>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input id="apartment" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </div>
            </>
          )}

          {checkoutStep === "payment" && (
            <>
              <h1 className="mb-6 text-2xl font-bold">Payment</h1>
              <PaymentGateway amount={total} onPaymentComplete={handlePaymentComplete} />
            </>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              {checkoutStep === "cart" && (
                <Button className="w-full" onClick={() => setCheckoutStep("shipping")}>
                  Proceed to Checkout
                </Button>
              )}
              {checkoutStep === "shipping" && (
                <Button className="w-full" onClick={() => setCheckoutStep("payment")}>
                  Continue to Payment
                </Button>
              )}
            </CardFooter>
          </Card>

          {checkoutStep !== "cart" && (
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => setCheckoutStep(checkoutStep === "payment" ? "shipping" : "cart")}
            >
              Back to {checkoutStep === "payment" ? "Shipping" : "Cart"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

