import { FastifyPluginAsync } from 'fastify';
import { getAllProducersWithLocation } from '../functions/get-products-location';

export const getLocationProducersRoute: FastifyPluginAsync = async (app) => {
  app.get('/location-producers', {
    schema: {
      summary: 'List all producers with valid location',
      tags: ['producers'],
    },
  }, async (_req, reply) => {
    const result = await getAllProducersWithLocation();
    const filtered = result.filter(p => p.latitude !== null && p.longitude !== null);
    const transformed = filtered.map((item) => ({
      id: item.id,
      nome: item.nome,
      preco:item.preco,
      tipo:item.tipo,
      latitude: item.latitude,
      longitude: item.longitude,
      foto: item.foto,
    }));
    return reply.send(transformed);
  });
};