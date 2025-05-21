import { db } from '../drizzle/client';
import { eq, sql } from 'drizzle-orm';
import axios from 'axios';
import { producers } from '../drizzle/schema/producerSchema';

export async function sendResetCode(telefone: string) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

  // Atualiza o produtor com código e expiração
  await db.update(producers)
    .set({
      code,
      expiresAt,
    })
    .where(eq(producers.telefone, telefone));

  // Envia SMS via Zenvia
  try {
    await axios.post(
      'https://api.zenvia.com/v2/channels/sms/messages',
      {
        from: 'VizinhoAgro',
        to: `+55${telefone}`,
        contents: [{ type: 'text', text: `Seu código de redefinição: ${code}` }],
      },
      {
        headers: {
          'X-API-TOKEN': 'SUA_CHAVE_API',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    throw new Error('Falha ao enviar código SMS');
  }
}
