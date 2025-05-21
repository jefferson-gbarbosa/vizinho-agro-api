import { eq } from 'drizzle-orm';
import { db } from '../drizzle/client';
import bcrypt from 'bcryptjs';
import { producers } from '../drizzle/schema/producerSchema';
import { addMinutes } from 'date-fns';

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

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // exemplo: '123456'
  const expiresAt = addMinutes(new Date(), 10); // expira em 10 minutos

  const [{ producerId }] = await db
    .insert(producers)
    .values({
      nome,
      telefone,
      senha: hashedPassword,
      tipoProducao,
      certificacoes: certificacoes ?? [],
      fotoPerfil: fotoPerfil ?? '',
      latitude,
      longitude,
      code,
      expiresAt,
    })
    .returning({
      producerId: producers.id,
    });

  return { producerId };
}
