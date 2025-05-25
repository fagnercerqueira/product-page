import { createContext, useState, useContext } from "react";
import type { SearchAddresssType, ShippingType, ShippingDataType, ShippingCalculateType } from "@/types/shipping";

const Shipping = createContext<ShippingType>({
  searchAddresss: async () => {},
  address: null,
  shippingValue: null,
  error: null,
});

export const useShipping = () => useContext(Shipping);

import { ReactNode } from "react";

export const Shippingrovider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState<ShippingDataType | null>(null);
    const [shippingValue, setShippingValue] = useState<number | null>(null);
    const [error, setError] = useState(null);

    const searchAddresss: SearchAddresssType = async (cep: string) => {
        try {
            setError(null);
            setShippingValue(null);
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const enderecoData: ShippingDataType = await response.json();

            if (enderecoData.erro) {
                throw new Error("CEP inválido.");
            }

            setAddress(enderecoData);

            calcularFrete(enderecoData.uf);
        } catch (error: any) {
            setError(error.message || "Erro ao buscar CEP.");
            setAddress(null);
            setShippingValue(null);
        }
    };

    const calcularFrete: ShippingCalculateType = (uf: string) => {
            let valor = 0;

            const sudeste: string[] = ["SP", "RJ", "MG", "ES"];
            const sulCentro: string[] = ["PR", "SC", "RS", "GO", "MT", "MS", "DF"];
            const norteNordeste: string[] = [
                "BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA", "PA", "AM", "RR", "RO", "AC", "AP", "TO"
            ];

            if (sudeste.includes(uf)) valor = 20.00;
            else if (sulCentro.includes(uf)) valor = 30.00;
            else if (norteNordeste.includes(uf)) valor = 40.00;
            else valor = 50.00;

            setShippingValue(valor);
    };

    return (
        <Shipping.Provider value={{ searchAddresss, address, shippingValue, error }}>
            {children}
        </Shipping.Provider>
    );
};