// routes/send-reset-code.ts
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { sendResetCode } from '../functions/sendResetCode';

export const sendResetCodeRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/send-reset-code',
    {
      schema: {
        summary: 'Enviar código de redefinição',
        tags: ['auth'],
        body: z.object({ telefone: z.string().min(10) }),
        response: {
          200: z.object({ success: z.boolean() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (req, reply) => {
      try {
        await sendResetCode(req.body.telefone);
        return reply.send({ success: true });
      } catch (err) {
        req.log.error(err);
        return reply.status(500).send({ error: 'Erro ao enviar código' });
      }
    }
  );
};
