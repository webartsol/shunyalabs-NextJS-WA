'use client'

import Image from "next/image"
import { useState } from "react"

type Props = {
  src: any
  alt: string
}

export default function ZoomImage({ src, alt }: Props) {

  const [zoomed, setZoomed] = useState(false)

  return (
    <>
      {/* Article image */}
      <div
        className="w-full md:rounded-lg overflow-hidden mt-4 cursor-zoom-in"
        onClick={() => setZoomed(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          priority
          className="w-full h-auto transition-transform duration-300"
        />
      </div>


      {/* Zoom Overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >

          <div className="relative w-[95vh] h-[95vh] md:w-[85vw] md:h-[85vh]">

            <Image
              src={src}
              alt={alt}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />

          </div>

        </div>
      )}
    </>
  )
}