
export type Dimension = {
  slug: string;
  title: string;
};

export type Product = {
  skuId: number;
  available: boolean;
  name: string;
  brand: string;
  dimensions: Dimension[]; 
  dimensionsMap: {
    [key: string]: string[]; 
  };
  price: number;
  bestPrice: number;
  description: string;
  gallery: string[];
};