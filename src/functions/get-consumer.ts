import { consumers } from './../drizzle/schema/consumerSchema';
import { db } from "../drizzle/client"


export async function getConsumers() {
  const allConsumers = await db.select().from(consumers)
  
  return allConsumers.map(producer => ({
    producerId: producer.id,
    nome: producer.nome ?? '',
    telefone: producer.telefone ?? '', 
  }))
}