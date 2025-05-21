import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import bcrypt from 'bcryptjs'; 
import { producers } from '../drizzle/schema/producerSchema';

interface loginProducerParams {
  telefone: string;
  senha: string;
}

export async function loginProducer({
  telefone,
  senha,
}: loginProducerParams) {
    const [producer] = await db
    .select()
    .from(producers)
    .where(eq(producers.telefone, telefone));

  if (!producer) {
    throw new Error('Telefone não encontrado');
  }
  const passwordMatch = await bcrypt.compare(senha, producer.senha);
  if (!passwordMatch) {
    throw new Error('Senha incorreta');
  }

  return {
    producerId: producer.id,
    nome: producer.nome ?? '',
  };
}


