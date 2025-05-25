import type { Product } from "@/types/product";

const product: Product = {
    skuId: 76,
    available: true,
    name: "Moletom Blusão Prime",
    brand: "montink",
    dimensions: [
        { slug: "cor", title: "Cor" }, 
        { slug: "size", title: "Tamanho" }
    ],
    dimensionsMap: {
        cor: ["Preto", "Branco", "Cinza"],
        size: ["P", "M", "G", "GG"],
    },
    price: 199.99,
    bestPrice: 169.99,
    description: "Moletom Blusão Prime com capuz e bolso frontal, ideal para o inverno.",
    gallery: [
        "/assets/img/1.png",
        "/assets/img/2.png",
        "/assets/img/3.png",
        "/assets/img/4.png",
    ]
}

export default product;