import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { filterByProductName } from "../functions/filter-by-product-name";


export const filterByNameRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/filter-by-name",
    {
      schema: {
        summary: "Filtrar produtores por nome do produto",
        tags: ["produtos"],
        querystring: z.object({
          name: z.string().min(1, "Nome do produto obrigatório"),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              nome: z.string().nullable(),
              latitude: z.number().nullable(),
              longitude: z.number().nullable(),
              products: z
                .object({
                nome: z.string().nullable(),
                preco: z.number().nullable(),
                })
                .nullable(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { name } = request.query;
      const result = await filterByProductName(name);
      console.log(result)
      return reply.send(result);
    }
  );
};