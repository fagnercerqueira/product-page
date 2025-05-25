import product from "@/mocks/product";

export async function GET() {
  return Response.json(product);
}