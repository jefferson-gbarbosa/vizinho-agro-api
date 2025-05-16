// types/fastify.d.ts
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      nome: string;
      type: 'consumer' | 'producer';
    };
  }
}
