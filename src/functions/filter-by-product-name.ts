import { db } from "../drizzle/client";
import { eq, ilike } from "drizzle-orm";
import { producers } from "../drizzle/schema/producerSchema";
import { products } from "../drizzle/schema/productSchema";
import { ProducerWithOptionalProduct } from "../types/producer";

export async function filterByProductName(name: string): Promise<ProducerWithOptionalProduct[]> {
  const result = await db
    .select({
      id: producers.id,
      nome: producers.nome,
      latitude: producers.latitude,
      longitude: producers.longitude,
      products: {
        nome: products.nome,  
        preco: products.preco,
      }
    })
    .from(producers)
    .innerJoin(products, eq(products.producerId, producers.id))
    .where(ilike(products.nome, `%${name}%`)); 

  return result;
}