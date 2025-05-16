// plugins/auth.ts
import { FastifyPluginAsync } from 'fastify';
import { verifyToken } from '../utils/jwt';

export const authPlugin: FastifyPluginAsync = async app => {
  app.addHook('onRequest', async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.status(401).send({ error: 'Token não enviado' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = verifyToken(token);

      // payload deve ter: sub, nome, type
      request.user = {
        id: payload.sub,
        nome: payload.nome,
        type: payload.type, // 'consumer' ou 'producer'
      };
    } catch (err) {
      request.log.error(err);
      return reply.status(401).send({ error: 'Token inválido' });
    }
  });
};
