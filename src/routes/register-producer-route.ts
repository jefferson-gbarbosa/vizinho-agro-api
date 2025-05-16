import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createProducer } from '../functions/register-producer'

export const createProducerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/producer',
    {
      schema: {
        summary: 'Create producer',
        tags: ['producers'],
        operationId: 'createProducer',
        body: z.object({
          nome: z.string(),
          telefone: z.string(),
          senha: z.string().min(6),
          tipoProducao: z.string(),
          certificacoes: z.any().optional(), 
          fotoPerfil: z.string().url().optional(),
          latitude: z.number(),
          longitude: z.number(),
        }),
        response: {
          201: z.object({ producerId: z.number() }),
        },
      },
    },
    async (request, reply) => {
      const {
        nome,
        telefone,
        senha,
        tipoProducao,
        certificacoes,
        fotoPerfil,
        latitude,
        longitude,
      } = request.body

      const { producerId } = await createProducer({
        nome,
        telefone,
        senha,
        tipoProducao,
        certificacoes,
        fotoPerfil,
        latitude,
        longitude,
      })

      return reply.status(201).send({ producerId })
    }
  )
}
