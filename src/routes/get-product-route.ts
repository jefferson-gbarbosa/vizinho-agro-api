import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getProduct } from '../functions/get-product' 

export const getProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products/:id',
    {
      schema: {
        summary: 'Get product',
        tags: ['products'],
        operationId: 'getProduct',
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            id: z.number(),
            nome: z.string(),
            tipo: z.string().nullable(),
            preco: z.number(),
            quantidade: z.number(),
            imagem: z.string().nullable(),
            disponibilidadeTipo: z.string(),
            disponivelAte: z.string().nullable(),
            producerId: z.number(),
          }),
          404: z.object({ message: z.string() }),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const product = await getProduct(id);

        if (!product) {
          return reply.status(404).send({ message: 'Produto não encontrado' });
        }

        return reply.send(product);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: 'Erro interno ao buscar produto' });
      }
    }
  );
}
