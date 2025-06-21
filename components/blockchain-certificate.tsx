"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Copy, ExternalLink, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface BlockchainCertificateProps {
  productId: number
  productName: string
  artisanName: string
  creationDate: string
  transactionHash: string
  blockchainNetwork: string
}

export default function BlockchainCertificate({
  productId,
  productName,
  artisanName,
  creationDate,
  transactionHash,
  blockchainNetwork,
}: BlockchainCertificateProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(transactionHash)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Transaction hash has been copied to your clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const explorerUrl =
    blockchainNetwork === "Ethereum"
      ? `https://etherscan.io/tx/${transactionHash}`
      : `https://polygonscan.com/tx/${transactionHash}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Shield className="h-4 w-4" /> View Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Certificate of Authenticity</DialogTitle>
          <DialogDescription>This artwork is authenticated on the {blockchainNetwork} blockchain</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <div className="relative mb-4 h-32 w-32">
            <Image
              src="/placeholder.svg?height=128&width=128"
              alt="Certificate"
              fill
              className="rounded-full border-4 border-primary/20 object-cover p-1"
            />
            <div className="absolute -right-2 -top-2 rounded-full bg-green-100 p-1 text-green-600">
              <Shield className="h-5 w-5" />
            </div>
          </div>
          <h3 className="mb-1 text-xl font-bold">{productName}</h3>
          <p className="text-sm text-muted-foreground">Created by {artisanName}</p>

          <div className="mt-6 w-full space-y-3 rounded-lg border p-4">
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium">Product ID:</span>
              <span className="col-span-2">{productId}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium">Creation Date:</span>
              <span className="col-span-2">{creationDate}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium">Network:</span>
              <span className="col-span-2">{blockchainNetwork}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-sm">
              <span className="font-medium">Transaction:</span>
              <div className="col-span-2 flex items-center gap-1 truncate">
                <span className="truncate">{transactionHash}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" asChild>
            <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" /> View on{" "}
              {blockchainNetwork === "Ethereum" ? "Etherscan" : "Polygonscan"}
            </a>
          </Button>
          <Button type="button">Download Certificate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

