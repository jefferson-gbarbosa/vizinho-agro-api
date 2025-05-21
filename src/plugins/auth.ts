import { FastifyPluginAsync } from 'fastify';
import { verifyToken } from '../utils/jwt';

export const authPlugin: FastifyPluginAsync = async app => {
  app.addHook('onRequest', async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) return;

    const token = authHeader.replace('Bearer ', '');
    const payload = verifyToken(token);
    if (!payload) return;

    request.user = {
      id: String(payload.sub),
      nome: payload.nome,
      type: payload.type,
    };
  });
};
