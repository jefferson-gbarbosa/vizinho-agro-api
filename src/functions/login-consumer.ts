import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { consumers } from '../drizzle/schema/consumerSchema'; 
import bcrypt from 'bcryptjs';

interface loginConsumerParams {
  telefone: string;
  senha: string
}

export async function loginConsumer({
  telefone,
  senha
}: loginConsumerParams) {
    const [consumer] = await db
    .select()
    .from(consumers)
    .where(eq(consumers.telefone, telefone));

  if (!consumer) {
    throw new Error('Telefone não encontrado');
  }

  const passwordMatch = await bcrypt.compare(senha, consumer.senha);
  if (!passwordMatch) {
    throw new Error('Senha incorreta');
  }

  return {
    consumerId: consumer.id,
    nome: consumer.nome,
  };
}


