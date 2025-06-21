"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Maximize2, Minimize2, Phone, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

function Model({ url, scale = 1 }) {
  const { scene } = useGLTF(url)
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />
}

interface ARViewerProps {
  productId: number
  productName: string
  modelUrl?: string
}

export default function ARViewer({ productId, productName, modelUrl = "/assets/3d/duck.glb" }: ARViewerProps) {
  const { toast } = useToast()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isARMode, setIsARMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        toast({
          title: "Error",
          description: `Could not enable fullscreen mode: ${err.message}`,
          variant: "destructive",
        })
      })
    } else {
      document.exitFullscreen()
    }
  }

  const launchAR = () => {
    // Check if WebXR is supported
    if ("xr" in navigator) {
      setIsARMode(true)
      toast({
        title: "AR Mode",
        description: "Point your camera at a flat surface to place the object",
      })
    } else {
      toast({
        title: "AR Not Supported",
        description: "Your device or browser doesn't support AR features",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="h-4 w-4" /> View in 3D/AR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{productName} - 3D View</DialogTitle>
          <DialogDescription>Explore the product in 3D or try it in your space with AR</DialogDescription>
        </DialogHeader>
        <div ref={containerRef} className="relative h-[400px] w-full overflow-hidden rounded-md">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model url={modelUrl} scale={1.5} />
            <OrbitControls />
            <Environment preset="apartment" />

            {isARMode && (
              <Html center>
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <p className="mb-2 text-center font-medium">AR Mode Active</p>
                  <Button variant="outline" size="sm" onClick={() => setIsARMode(false)} className="w-full">
                    Exit AR Mode
                  </Button>
                </div>
              </Html>
            )}
          </Canvas>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => launchAR()}
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => {
                const controls = document.querySelector(".orbit-controls")
                if (controls) {
                  // Reset camera position
                }
              }}
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">
          <p>Drag to rotate • Pinch or scroll to zoom • Double-tap to reset view</p>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setIsARMode(false)}>
            Back to 3D View
          </Button>
          <Button onClick={launchAR}>View in Your Space (AR)</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

