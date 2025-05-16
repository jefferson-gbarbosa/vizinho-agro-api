import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createConsumer } from '../functions/register-consumer'

export const createConsumerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/consumer',
    {
      schema: {
        summary: 'Create producer',
        tags: ['producers'],
        operationId: 'createProducer',
        body: z.object({
          nome: z.string(),
          telefone: z.string(),
          senha: z.string().min(6),
        }),
        response: {
          201: z.object({ consumerId: z.number() }),
        },
      },
    },
    async (request, reply) => {
      const {
        nome,
        telefone,
        senha,
      } = request.body

      const { consumerId } = await createConsumer({
        nome,
        telefone,
        senha
      })

      return reply.status(201).send({ consumerId })
    }
  )
}
