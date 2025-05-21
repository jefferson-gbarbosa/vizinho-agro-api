import { db } from "../drizzle/client"
import { eq } from 'drizzle-orm';
import { producers } from "../drizzle/schema/producerSchema";
import { products } from "../drizzle/schema/productSchema";

export async function getAllProducersWithLocation() {
  const rows = await db
    .select({
      id: producers.id,
      nome: producers.nome,
      latitude: producers.latitude,
      longitude: producers.longitude,
      preco: products.preco,
      tipo: products.tipo,
      foto: products.imagem,
    })
    .from(producers)
    .leftJoin(products, eq(products.producerId, producers.id));

  return rows;
}

