import { db } from "../drizzle/client"
import { products } from '../drizzle/schema/productSchema';

export async function getProducts() {
  const allProducts = await db.select().from(products)

  return allProducts.map(product => ({
    id: product.id,
    nome: product.nome,
    tipo: product.tipo ?? '',
    preco: product.preco,
    quantidade: product.quantidade ?? 0,
    imagem: product.imagem ?? '',
    disponibilidadeTipo: product.disponibilidadeTipo ?? 'always',
    disponivelAte: product.disponivelAte?.toString() ?? null,
  }));
}
