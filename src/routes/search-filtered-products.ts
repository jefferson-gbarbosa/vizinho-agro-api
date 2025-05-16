// src/routes/search-filtered-products.ts
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { filterProducts } from "../functions/filter-products";

export const searchFilteredProductsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/filter",
    {
      schema: {
        summary: "Filtrar produtos com base em localização e critérios",
        tags: ["produtos"],
        operationId: "filterProducts",
        querystring: z.object({
          distance: z.coerce.number().default(5),
          type: z.string().optional(),
          price: z.coerce.number().optional(),
          latitude: z.coerce.number(),
          longitude: z.coerce.number(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              nome: z.string().nullable(),
              tipo: z.string().nullable(),
              preco: z.number().nullable(),
              quantidade: z.number().nullable(),
              imagem: z.string().nullable(),
              disponibilidadeTipo: z.string().nullable(),
              disponivelAte: z.string().nullable(),
              producerId: z.number(),
              latitude: z.number().nullable(),
              longitude: z.number().nullable(),
            })
          ),
          500: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { distance, type, price,latitude, longitude } =
          request.query;
          console.log(request.query)

        const produtos = await filterProducts({
          distance,
          type,
          price,
          latitude,
          longitude,
        });

        return reply.send(produtos);
      } catch (err) {
        console.error(err);
        return reply.status(500).send({ message: "Erro ao filtrar produtos" });
      }
    }
  );
};
