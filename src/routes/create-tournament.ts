import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const EnumTournamentFormat = z.enum([
  "LEAGUE",
  "KNOCKOUT",
  "GROUPS"
]);

export async function createTournament(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/tournaments', {
    schema: {
      body: z.object({
        name: z.string(),
        edition: z.number().int(),
        format: EnumTournamentFormat,
        description: z.string(),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { name, edition, format, description } = req.body;

    try {
      const tournament = await prisma.tournament.create({
        data: {
          name,
          edition,
          format,
          description,
          createdAt: new Date(),
        },
      });

      return rep.status(201).send(tournament);
    } catch (error) {
      console.error("Error creating tournament:", error);
      return rep.status(500).send({ message: "Error creating tournament" });
    }
  });
}
