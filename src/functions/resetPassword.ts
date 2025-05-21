import { db } from '../drizzle/client';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { producers } from '../drizzle/schema/producerSchema';
import { isAfter } from 'date-fns';

interface ResetPasswordParams {
  telefone: string;
  code: string;
  novaSenha: string;
}

export async function resetPassword({ telefone, code, novaSenha }: ResetPasswordParams) {
  const [producer] = await db
    .select()
    .from(producers)
    .where(eq(producers.telefone, telefone));

  if (
    !producer ||
    producer.code !== code ||
    !producer.expiresAt ||
    isAfter(new Date(), producer.expiresAt)
  ) {
    throw new Error('Código inválido ou expirado');
  }

  const hashed = await bcrypt.hash(novaSenha, 10);

 await db.update(producers)
  .set({
    senha: hashed,
    code: sql`NULL`,
    expiresAt: sql`NULL`,
  })
  .where(eq(producers.telefone, telefone));

  return { success: true };
}
