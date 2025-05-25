import type { Product } from "@/types/product";

const product: Product = {
    skuId: 76,
    available: true,
    name: "Moletom Blusão Prime",
    dimensions: ["cor", "size"],
    dimensionsMap: {
        cor: ["Preto", "Branco", "Cinza"],
        size: ["P", "M", "G", "GG"],
    },
    price: 199.99,
    description: "Moletom Blusão Prime com capuz e bolso frontal, ideal para o inverno.",
    gallery: [
        "/assets/img/1.jpg",
        "/assets/img/2.jpg",
        "/assets/img/3.jpg",
        "/assets/img/4.jpg",
    ]
}

export default product;