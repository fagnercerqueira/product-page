export type Product = {
  skuId: number;
  available: boolean;
  name: string;
  dimensions: string[]; 
  dimensionsMap: {
    [key: string]: string[]; 
  };
  price: number;
  description: string;
  gallery: string[];
};