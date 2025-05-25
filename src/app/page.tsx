import { notFound } from 'next/navigation'
import ProductDescription from '@/components/ProductDescription';
import ProductGallery from '@/components/ProductGallery';
import type { Product } from "@/types/product";
import { Providers } from '@/app/providers';
 
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
    <Providers>
      <section className='flex justify-center items-center min-h-dvh gap-12 px-20 y-20 m-auto max-w-7xl'>
        <div className="container xl:min-w-md max-w-3xl">
          <ProductGallery gallery={product.gallery} name={product.name} />
        </div>
        <div className="container mx-auto px-6 pt-5 sm:pt-10 lg:pt-5 pb-20 lg:pb-5 lg:pr-0 lg:pl-7 xl:ml-1">
          <ProductDescription {...product}/>
        </div>
      </section>
    </Providers>
  )
}

