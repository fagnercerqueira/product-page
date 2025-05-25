export type SearchAddresss = (cep: string) => Promise<void>;

export type ShippingType = {
  searchAddresss: SearchAddresss;
  address: any;
  shippingValue: number | null;
  error: string | null;
}

export type EnderecoData = {
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

export type CalcularFrete = {
    (uf: string): void;
}
