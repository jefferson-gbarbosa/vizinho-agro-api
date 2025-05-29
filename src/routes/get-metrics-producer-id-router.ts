import { FastifyPluginAsync } from 'fastify';
import { getMetricsByProducer } from '../functions/get-metrics';
import { z } from 'zod';

const errorSchema = z.object({
  message: z.string(),
});

// Validação do parâmetro `producerId` corretamente
const paramsSchema = z.object({
  producerId: z.coerce.number(),
});

// Schema de resposta com nomes alinhados ao banco
const metricSchema = z.object({
  id: z.number(),
  producer_id: z.number(),
  produtosCadastrados: z.number(),
  vendasSemanais: z.number(),
  clientesAtivos: z.number(),
  avaliacaoMedia: z.number(),
});

export const getMetricsProducersRoute: FastifyPluginAsync = async (app) => {
  app.get('/producers/:producerId/metrics', {
    schema: {
      summary: 'Obtenha métricas para um produtor específico',
      tags: ['produtores'],
      params: paramsSchema,
      response: {
        200: z.union([
          metricSchema,               
          z.array(metricSchema),       
        ]),
        404: errorSchema,
        500: errorSchema,
      }
    }
  }, async (req, reply) => {

    const { producerId } = paramsSchema.parse(req.params); 
    console.log('Producer ID:', producerId);
    try {
      const result = await getMetricsByProducer(producerId);

      if (!result) {
       return reply.status(404).send({ message: 'Nenhuma métrica encontrada. Cadastre uma para este produtor.' });
      }
      console.log(result)
      return reply.send(result);
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({ message: 'Internal server error' });
    }
  });
};
