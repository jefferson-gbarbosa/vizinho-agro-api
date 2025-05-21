// routes/reset-password.ts
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { resetPassword } from '../functions/resetPassword';

export const resetPasswordRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/reset-password',
    {
      schema: {
        summary: 'Redefinir senha do consumidor',
        tags: ['auth'],
        body: z.object({
          telefone: z.string().min(10),
          code: z.string().length(6),
          novaSenha: z.string().min(6),
        }),
        response: {
          200: z.object({ success: z.boolean() }),
          400: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (req, reply) => {
      try {
        await resetPassword(req.body);
        return reply.send({ success: true });
      } catch (err) {
        req.log.error(err);
        return reply.status(400).send({ error: (err as Error).message });
      }
    }
  );
};
