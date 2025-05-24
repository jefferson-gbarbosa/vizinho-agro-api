import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client"
import { products } from '../drizzle/schema/productSchema';

export async function getProduct(id: number) {
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);

  if (result.length === 0) return null;

  const product = result[0];
  return {
    id: product.id,
    nome: product.nome,
    tipo: product.tipo,
    preco: product.preco,
    quantidade: product.quantidade ?? 0,
    imagem: product.imagem,
    disponibilidadeTipo: product.disponibilidadeTipo ?? 'Sempre',
    disponivelAte: product.disponivelAte?.toString() ?? null,
    producerId: product.producerId,
  };
}
