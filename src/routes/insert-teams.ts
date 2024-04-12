import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function insertTeams(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/teams', {
    schema: {
      body: z.object({
        clubs: z.array(z.object({
          name: z.string().min(4).max(100),
          createdAt: z.string(),
        })),
      }),
      response: {
        201: z.object({
          teamIds: z.array(z.string().uuid()),
        }),
      },
    },
  }, async (req, rep) => {
    const { clubs } = req.body;

    const teamIds = [];

    for (const club of clubs) {
      const { name, createdAt } = club;

      // Converte a string createdAt para um objeto Date
      const createdAtDate = new Date(createdAt);

      const team = await prisma.team.create({
        data: {
          name,
          createdAt: createdAtDate,
        },
      });

      teamIds.push(team.id);
    }

    return rep.status(201).send({ teamIds });
  });
}