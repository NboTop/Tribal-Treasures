"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PaymentGatewayProps {
  amount: number
  onPaymentComplete: () => void
}

export default function PaymentGateway({ amount, onPaymentComplete }: PaymentGatewayProps) {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [upiId, setUpiId] = useState("")

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Payment Successful",
        description: `Your payment of ₹${amount.toLocaleString()} has been processed successfully.`,
      })
      onPaymentComplete()
    }, 2000)
  }

  const handleUpiPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate UPI payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "UPI Payment Initiated",
        description: "Please complete the payment in your UPI app.",
      })
      // In a real implementation, you would poll for payment status
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: `Your payment of ₹${amount.toLocaleString()} has been processed successfully.`,
        })
        onPaymentComplete()
      }, 3000)
    }, 1500)
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Payment Method</h3>

      <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="mt-4">
          <form onSubmit={handleCardPayment}>
            <div className="mb-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input id="nameOnCard" placeholder="John Doe" required />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="font-medium">Total Amount</p>
                <p className="text-sm text-muted-foreground">Including taxes and fees</p>
              </div>
              <p className="text-xl font-bold">₹{amount.toLocaleString()}</p>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CreditCard className="h-3 w-3" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="upi" className="mt-4">
          <form onSubmit={handleUpiPayment}>
            <div className="mb-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
              </div>

              <RadioGroup defaultValue="pay">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pay" id="pay" />
                  <Label htmlFor="pay" className="flex items-center gap-2">
                    <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Google Pay" />
                    Google Pay
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phonepe" id="phonepe" />
                  <Label htmlFor="phonepe" className="flex items-center gap-2">
                    <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="PhonePe" />
                    PhonePe
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paytm" id="paytm" />
                  <Label htmlFor="paytm" className="flex items-center gap-2">
                    <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Paytm" />
                    Paytm
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="font-medium">Total Amount</p>
                <p className="text-sm text-muted-foreground">Including taxes and fees</p>
              </div>
              <p className="text-xl font-bold">₹{amount.toLocaleString()}</p>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="wallet" className="mt-4">
          <div className="space-y-4">
            <RadioGroup defaultValue="paytm">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paytm" id="paytm-wallet" />
                <Label htmlFor="paytm-wallet" className="flex items-center gap-2">
                  <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Paytm Wallet" />
                  Paytm Wallet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amazon" id="amazon-pay" />
                <Label htmlFor="amazon-pay" className="flex items-center gap-2">
                  <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Amazon Pay" />
                  Amazon Pay
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mobikwik" id="mobikwik" />
                <Label htmlFor="mobikwik" className="flex items-center gap-2">
                  <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="MobiKwik" />
                  MobiKwik
                </Label>
              </div>
            </RadioGroup>

            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div>
                <p className="font-medium">Total Amount</p>
                <p className="text-sm text-muted-foreground">Including taxes and fees</p>
              </div>
              <p className="text-xl font-bold">₹{amount.toLocaleString()}</p>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                setIsProcessing(true)
                setTimeout(() => {
                  setIsProcessing(false)
                  toast({
                    title: "Payment Successful",
                    description: `Your payment of ₹${amount.toLocaleString()} has been processed successfully.`,
                  })
                  onPaymentComplete()
                }, 2000)
              }}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex items-center justify-center gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Encrypted Data</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  )
}

