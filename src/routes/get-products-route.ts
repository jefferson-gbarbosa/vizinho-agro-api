import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getProducts } from '../functions/get-products' 

const errorSchema = z.object({
    message: z.string(),
})
  
export const getProductsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/product',
    {
      schema: {
        summary: 'Get all products',
        tags: ['products'],
        operationId: 'getAllProducts',
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              nome: z.string(),
              tipo: z.string(),
              preco: z.number(),
              quantidade: z.number(),
              imagem: z.string(),
              disponibilidadeTipo: z.string(),
              disponivelAte: z.string().nullable(),
            })
          ),
          500: errorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const allProducts  = await getProducts()  
        return reply.status(200).send(allProducts)  
      } catch (error) {
        console.error('Erro ao buscar produtores:', error)
        return reply.status(500).send({ message: 'Erro interno ao buscar os produtores' })
      }
    }
  )
}
