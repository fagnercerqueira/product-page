export type SearchAddresssType = (cep: string) => Promise<void>;

export type ShippingType = {
  searchAddresss: SearchAddresssType;
  address: any;
  shippingValue: number | null;
  error: string | null;
}

export type ShippingDataType = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro?: boolean;
}

export type ShippingCalculateType = {
    (uf: string): void;
}
