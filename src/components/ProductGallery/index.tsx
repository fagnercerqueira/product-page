"use client"
import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image";
import type { Product } from "@/types/product";
import ProductGalleryThumb from './ProductGalleryThumb'

type ProductGalleryProps = Pick<Product, "gallery" | "name">;

export default function ProductGallery({gallery, name}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({})
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  interface OnThumbClick {
    (index: number): void;
  }

  const onThumbClick: OnThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl" ref={emblaMainRef}>
        <div className="flex flex-row">
          {gallery.map((item, index) => (
            <div key={index} className="flex w-full flex-[0_0_100%]">
              <Image src={item} width="1585" height="1585" alt={name} className="object-cover"/>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full overflow-hidden">
        <div ref={emblaThumbsRef}>
          <div className="flex flex-row gap-4">
            {gallery.map((item, index) => (
              <ProductGalleryThumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
              >
                <Image
                  src={item}
                  width="1585"
                  height="1585"
                  alt={name}
                  className="object-cover"
                />
              </ProductGalleryThumb>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
