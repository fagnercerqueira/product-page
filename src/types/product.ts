
export type DimensionType = {
  slug: string;
  title: string;
};

export type ProductType = {
  skuId: number;
  available: boolean;
  name: string;
  brand: string;
  dimensions: DimensionType[]; 
  dimensionsMap: {
    [key: string]: string[]; 
  };
  price: number;
  bestPrice: number;
  description: string;
  gallery: string[];
};