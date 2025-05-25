import { notFound } from 'next/navigation'
import ProductDescription from '@/components/ProductDescription';
import ProductGallery from '@/components/ProductGallery';
import type { Product } from "@/types/product";

 
async function getProduct() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`, {
    cache: 'force-cache',
  })
  const product: Product = await res.json()
  if (!product) notFound()
  return product
}

export default async function Home() {

  const product: Product = await getProduct();

  return (
    <>
      {product.name}
      <ProductDescription/>
      <ProductGallery/>
    </>
  )
}

