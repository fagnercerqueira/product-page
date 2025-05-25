"use client";
import { useState } from "react";
import { useShipping } from "@/contexts/shippingContext";
import { cepFormatter, moneyFormatter } from "@/utils/formatter";
type HandleSubmitEvent = React.FormEvent<HTMLFormElement>;

export default function ShippingForm() {
    const [cep, setCep] = useState("");
    const { searchAddresss, address, shippingValue, error } = useShipping();

    const handleSubmit = (e: HandleSubmitEvent) => {
        e.preventDefault();
        const cleanCep = cep.replace("-", ""); 
        if (cleanCep.length === 8) {
            searchAddresss(cep);
        } else {
            alert("Digite um CEP válido com 8 dígitos.");
        }
    };
    
    return (
        <div className="p-4 w-full bg-neutral-800 rounded-lg mt-12">
            <span className="block mb-2">Digite o CEP:</span>
            <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2">
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => {
                        const masked = cepFormatter(e.target.value);
                        setCep(masked);
                    }}
                    className="col-span-3 border p-2 w-full rounded-lg"
                    maxLength={9}
                />
                <button
                    type="submit"
                    className="col-span-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                    Calcular Frete
                </button>
            </form>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            {address && (
                <div className="mt-4">
                    <h3 className="font-bold">Endereço:</h3>
                    <p>{`${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf}`}</p>
                </div>
            )}

            {shippingValue !== null && (
                <div className="mt-2">
                    <h4 className="font-semibold">Frete estimado: {moneyFormatter.format(shippingValue)}</h4>
                </div>
            )}
        </div>
    );
}