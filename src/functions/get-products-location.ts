import { db } from "../drizzle/client"
import { eq } from 'drizzle-orm';
import { producers } from "../drizzle/schema/producerSchema";
import { products } from "../drizzle/schema/productSchema";

// export async function getAllProducersWithLocation() {
//   const rows = await db
//     .select({
//       id: producers.id,
//       nome: producers.nome,
//       latitude: producers.latitude,
//       longitude: producers.longitude,
//       preco: products.preco,
//       tipo: products.tipo,
//       foto: products.imagem,
//     })
//     .from(producers)
//     .leftJoin(products, eq(products.producerId, producers.id));

//   return rows;
// }

type Product = {
  nome: string;
  preco: number;
  quantidade: number;
  foto: string | null;
  tipo: string | null;
};

type ProducerWithProducts = {
  id: number;
  nome: string | null;
  latitude: number | null;
  longitude: number | null;
  products: Product[];
};

export async function getAllProducersWithLocation(): Promise<ProducerWithProducts[]> {
  const rows = await db
    .select({
      producerId: producers.id,
      nome: producers.nome,
      latitude: producers.latitude,
      longitude: producers.longitude,

      // Campos do produto
      produtoNome: products.nome,
      preco: products.preco,
      quantidade: products.quantidade,
      tipo: products.tipo,
      foto: products.imagem,
    })
    .from(producers)
    .leftJoin(products, eq(products.producerId, producers.id));

  const grouped = new Map<number, ProducerWithProducts>();

  for (const row of rows) {
    const existing = grouped.get(row.producerId);

    const product: Product | null =
      row.produtoNome !== null && row.preco !== null
        ? {
            nome: row.produtoNome,
            preco: row.preco,
            quantidade: row.quantidade ?? 0,
            tipo: row.tipo,
            foto: row.foto,
          }
        : null;

    if (existing) {
      if (product) existing.products.push(product);
    } else {
      grouped.set(row.producerId, {
        id: row.producerId,
        nome: row.nome,
        latitude: row.latitude,
        longitude: row.longitude,
        products: product ? [product] : [],
      });
    }
  }

  return Array.from(grouped.values());
}

