export function cepFormatter(cep: string): string {
  return cep
    .replace(/\D/g, '') 
    .slice(0, 8)
    .replace(/^(\d{5})(\d{1,3})$/, '$1-$2'); 
}

export const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
