import { products } from '../drizzle/schema/productSchema';
import { eq, and } from 'drizzle-orm';
import { db } from '../drizzle/client';

interface CreateProductParams {
  nome: string;
  tipo?: string;
  preco: number;
  quantidade?: number;
  imagem?: string;
  disponibilidadeTipo?: string;
  disponivelAte?: Date | string;
  producerId: number;
}

export async function createProduct(params: CreateProductParams) {
  const {
    nome,
    tipo,
    preco,
    quantidade = 0,
    imagem,
    disponibilidadeTipo = 'always',
    disponivelAte,
    producerId,
  } = params;

  try {
    // Check for existing product - CORRECTED QUERY
    const existing = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.nome, nome),
          eq(products.producerId, producerId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return { productId: existing[0].id, isNew: false };
    }

    // Handle date conversion if needed
    const disponivelAteDate = disponivelAte 
      ? typeof disponivelAte === 'string' ? disponivelAte : disponivelAte.toISOString() 
      : null;

    // Insert new product
    const [result] = await db
      .insert(products)
      .values({
        nome,
        tipo,
        preco,
        quantidade,
        imagem,
        disponibilidadeTipo,
        disponivelAte: disponivelAteDate,
        producerId,
      })
      .returning({ productId: products.id });

    return { productId: result.productId, isNew: true };
  } catch (error) {
    console.error('Failed to create product:', error);
    throw new Error('Failed to create product');
  }
}