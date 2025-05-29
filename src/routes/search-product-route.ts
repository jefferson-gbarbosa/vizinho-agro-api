import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { searchProducts } from '../functions/search-product'

export const searchProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/products',
    {
      schema: {
        summary: 'Pesquisar produtos',
        tags: ['produtos'],
        operationId: 'searchProducts',
        querystring: z.object({
          search: z.string().min(1).optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              nome: z.string(),
              tipo: z.string().nullable(),
              preco: z.number(),
              quantidade: z.number().nullable(),
              imagem: z.string().nullable(),
              disponibilidadeTipo: z.string().nullable(),
              disponivelAte: z.string().nullable(),
              producerId: z.number(),
            })
          ),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { search } = request.query
        const products = await searchProducts(search ?? '')
        return reply.send(products)
      } catch (err) {
        console.error(err)
        return reply.status(500).send({ message: 'Erro ao buscar produtos' })
      }
    }
  )
}
