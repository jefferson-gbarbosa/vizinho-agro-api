import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getProducer } from '../functions/get-producer-by-id'

export const getProducerByIdRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/producers/:id',
    {
      schema: {
        summary: 'Obter produtor por id',
        tags: ['produtores'],
        operationId: 'getProducertId',
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            producerId: z.number(),
            nome: z.string(),
            telefone: z.string(),
            foto: z.string().nullable(), 
            tipoProducao: z.string(),
            latitude: z.number(),
            longitude: z.number(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const producer = await getProducer(id);
    
        if (!producer) {
          return reply.status(404).send({ message: 'Produtor não encontrado' });
        }

        return reply.send(producer);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Erro interno ao buscar produto' });
      }
    }
  );
}
