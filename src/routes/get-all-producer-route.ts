import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getProducers } from '../functions/get-producer'

const errorSchema = z.object({
    message: z.string(),
})
  
export const getAllProducersRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/producers',
    {
      schema: {
        summary: 'Get all producers',
        tags: ['producers'],
        operationId: 'getAllProducers',
        response: {
          200: z.array(
            z.object({
              producerId: z.number(),
              nome: z.string(),
              telefone: z.string(),
              foto: z.string().nullable(), 
              tipoProducao: z.string(),
              latitude: z.number(),
              longitude: z.number(),
            })
          ),
          500: errorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        const allProducers  = await getProducers()  
        return reply.status(200).send(allProducers)  
      } catch (error) {
        console.error('Erro ao buscar produtores:', error)
        return reply.status(500).send({ message: 'Erro interno ao buscar os produtores' })
      }
    }
  )
}
