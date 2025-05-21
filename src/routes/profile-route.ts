import { FastifyPluginAsync } from 'fastify';
import { authPlugin } from '../plugins/auth';

export const profileRoute: FastifyPluginAsync = async app => {
  await app.register(authPlugin);

  app.get('/me', async (request, reply) => {
    if (!request.user) {
      return reply.status(401).send({ error: 'Não autenticado' });
    }

    const { id, nome, type } = request.user;

    return { id, nome, tipo: type };
  });
};
