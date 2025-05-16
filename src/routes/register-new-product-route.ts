import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createProduct } from '../functions/register-new-product'

export const createNewProductRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/product',
    {
      schema: {
        summary: 'Create new product',
        tags: ['products'],
        operationId: 'createProduct',
        body: z.object({
          nome: z.string(),
          tipo: z.string().optional(),
          preco: z.number(),
          quantidade: z.number().optional(),
          imagem: z.string().url().optional(),
          disponibilidadeTipo: z.string().optional().default('always'),
          disponivelAte: z.string().optional(), 
          producerId: z.number(),
        }),
        response: {
          201: z.object({ productId: z.number(), isNew: z.boolean() }),
        },
      },
    },
    async (request, reply) => {
      const {
        nome,
        tipo,
        preco,
        quantidade,
        imagem,
        disponibilidadeTipo,
        disponivelAte,
        producerId,
      } = request.body

      const { productId, isNew } = await createProduct({
        nome,
        tipo,
        preco,
        quantidade,
        imagem,
        disponibilidadeTipo,
        disponivelAte,
        producerId,
      })
      console.log({ productId, isNew })
      return reply.status(201).send({ productId, isNew })
    }
  )
}
