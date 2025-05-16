import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { loginConsumer } from '../functions/login-consumer';
import { generateToken } from '../utils/jwt';

export const loginConsumerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login-consumer',
    {
      schema: {
        summary: 'Login de consumidor',
        tags: ['consumers'],
        body: z.object({
          telefone: z.string(),
          senha: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
            consumerId: z.number(),
            nome: z.string(),
          }),
          401: z.object({ error: z.string() }),
          500: z.object({ error: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { telefone, senha } = request.body;

      try {
        const result = await loginConsumer({ telefone, senha });
        const token = generateToken({
          sub: result.consumerId,
          nome: result.nome,
          type: 'consumer',
        });
        //  console.log( token,result.consumerId,result.nome,)
         return reply.send({
          token,
          consumerId: result.consumerId,
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
