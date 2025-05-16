import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { loginProducer } from '../functions/login-producer';
import { generateToken } from '../utils/jwt';

export const loginProducerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login-producer',
    {
      schema: {
        summary: 'Login de Produtor',
        tags: ['producers'],
        body: z.object({
          telefone: z.string(),
          senha: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
            producerId: z.number(),
            nome: z.string(),
          }),
          401: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { telefone, senha} = request.body;

      try {
        const result = await loginProducer({ telefone, senha});
        const token = generateToken({
          sub: result.producerId,
          nome: result.nome,
          type: 'consumer',
        });
         return reply.send({
          token,
          producerId: result.producerId,
          nome: result.nome,
        });
      } catch (err) {
        const errorMessage = (err as Error).message;

        if (errorMessage === 'Credenciais inválidas') {
          return reply.status(401).send({ error: errorMessage });
        }

        request.log.error(err);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
      }
    }
  );
};
