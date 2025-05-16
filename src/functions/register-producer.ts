import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import { producers } from '../drizzle/schema/producerSchema'; 
import bcrypt from 'bcryptjs';

interface CreateProducerParams {
  nome: string;
  telefone: string;
  senha: string;
  tipoProducao: string;
  certificacoes?: any; 
  fotoPerfil?: string;
  latitude: number;
  longitude: number;
}

export async function createProducer({
  nome,
  telefone,
  tipoProducao,
  senha,
  certificacoes,
  fotoPerfil,
  latitude,
  longitude,
}: CreateProducerParams) {
  const existing = await db
    .select()
    .from(producers)
    .where(eq(producers.telefone, telefone));

  if (existing.length > 0) {
    return { producerId: existing[0].id };
  }

   const hashedPassword = await bcrypt.hash(senha, 10);

  const [{ producerId }] = await db
    .insert(producers)
    .values({
      nome,
      telefone,
      senha: hashedPassword,
      tipoProducao,
      certificacoes:certificacoes ?? [],
      fotoPerfil: fotoPerfil ?? null,
      latitude,
      longitude,
    })
    .returning({
      producerId: producers.id,
    });

  return { producerId };
}

