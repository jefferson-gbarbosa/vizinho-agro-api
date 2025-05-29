import { FastifyPluginAsync } from 'fastify';
import { getAllProducersWithLocation } from '../functions/get-products-location';

export const getLocationProducersRoute: FastifyPluginAsync = async (app) => {
  app.get('/location-producers', {
    schema: {
      summary: 'Listar todos os produtores com localização válida e seus produtos',
      tags: ['produtores'],
    },
  }, async (_req, reply) => {
    const result = await getAllProducersWithLocation();

    const filtered = result.filter(p => p.latitude !== null && p.longitude !== null);

    const transformed = filtered.map((item) => ({
      id: item.id,
      nome: item.nome,
      latitude: item.latitude,
      longitude: item.longitude,
      products: item.products.map(product => ({
        nome: product.nome,
        preco: product.preco,
        quantidade: product.quantidade,
        tipo: product.tipo,
        foto: product.foto,
      })),
    }));

    return reply.send(transformed);
  });
};
