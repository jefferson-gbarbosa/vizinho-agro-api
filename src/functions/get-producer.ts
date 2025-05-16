import { db } from "../drizzle/client"
import { producers } from "../drizzle/schema/producerSchema"

export async function getProducers() {
  const allProducers = await db.select().from(producers)
  
  return allProducers.map(producer => ({
    producerId: producer.id,
    nome: producer.nome ?? '',
    telefone: producer.telefone ?? '', 
    foto: producer.fotoPerfil ?? null,      
    tipoProducao: producer.tipoProducao ?? '',
    latitude: producer.latitude ?? 0,
    longitude: producer.longitude ?? 0,
  }))
}
