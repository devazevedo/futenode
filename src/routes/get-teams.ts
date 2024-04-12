import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getTeams(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/teams', {
    schema: {
      response: {
        200: z.array(z.object({ // Alterado para retornar um array diretamente
          name: z.string(),
          createdAt: z.string(),
        })),
      },
    },
  }, async (req, rep) => {
    const teams = await prisma.team.findMany();

    const formattedTeams: { name: string; createdAt: string; }[] = teams.map(team => ({
      name: team.name,
      createdAt: team.createdAt!.toISOString(), // Assert that createdAt is not null
    }));

    console.log(formattedTeams); // Add logging here

    return rep.status(200).send(formattedTeams); // Alterado para retornar o array diretamente
  });
}