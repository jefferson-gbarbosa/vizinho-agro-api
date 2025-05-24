import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client"
import { producers } from '../drizzle/schema/producerSchema';


export async function getProducer(id: number) {
  const result = await db.select().from(producers).where(eq(producers.id, id)).limit(1);

  if (result.length === 0) return null;

  const producer = result[0];
  return {
    producerId: producer.id,
    nome: producer.nome ?? '',
    telefone: producer.telefone ?? '', 
    foto: producer.fotoPerfil ?? null,      
    tipoProducao: producer.tipoProducao ?? '',
    latitude: producer.latitude ?? 0,
    longitude: producer.longitude ?? 0,
  };
}
