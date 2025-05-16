import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { consumers } from '../drizzle/schema/consumerSchema'; 
import bcrypt from 'bcryptjs';

interface CreateConsumerParams {
  nome: string;
  telefone: string;
  senha: string
}

export async function createConsumer({
  nome,
  telefone,
  senha
}: CreateConsumerParams) {
  const existing = await db
    .select()
    .from(consumers)
    .where(eq(consumers.telefone, telefone));

  if (existing.length > 0) {
    return { consumerId: existing[0].id };
  }

   // Cria hash da senha
  const hashedPassword = await bcrypt.hash(senha, 10);

  const [{ consumerId }] = await db
    .insert(consumers)
    .values({
      nome,
      telefone,
      senha: hashedPassword,
    })
    .returning({
      consumerId: consumers.id,
    });

  return { consumerId };
}


