"use client"
import Image from "next/image";
import type { Product } from "@/types/product";

type ProductGalleryProps = Pick<Product, "gallery" | "name">;

export default function ProductGallery({gallery, name}: ProductGalleryProps) {
    console.log(gallery);
    return (
         <div className="xl:min-w-md max-w-3xl rounded-2xl overflow-hidden">
            <Image src={gallery[0]} width="1585" height="1585" alt={name} className="object-cover"/>
        </div>
    );
}
