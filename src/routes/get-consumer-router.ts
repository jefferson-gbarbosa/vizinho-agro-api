import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getConsumers } from '../functions/get-consumer'

const errorSchema = z.object({
    message: z.string(),
})
  
export const getConsumersRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/consumers',
    {
      schema: {
        summary: 'Get consumers',
        tags: ['consumers'],
        operationId: 'getConsumers',
        response: {
          200: z.array(
            z.object({
              producerId: z.number(),
              nome: z.string(),
              telefone: z.string(),
            })
          ),
          500: errorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const allConsumers  = await getConsumers() 
        return reply.status(200).send(allConsumers)  
      } catch (error) {
        console.error('Erro ao buscar consumidores:', error)
        return reply.status(500).send({ message: 'Erro interno ao buscar os consumidores' })
      }
    }
  )
}
