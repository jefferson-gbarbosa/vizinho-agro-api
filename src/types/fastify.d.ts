// types/fastify.d.ts
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string;
      nome: string;
      type: 'producer';
    };
  }
}
