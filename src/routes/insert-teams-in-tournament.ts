import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function insertTeamsInTournament(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/teams/:tournamentId', {
    schema: {
      params: z.object({
        tournamentId: z.string().uuid(),
      }),
      body: z.object({
        TeamTournament: z.array(z.object({
          teamId: z.string().uuid(),
        })),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { tournamentId } = req.params;
    const { TeamTournament } = req.body;

    try {
      const findTournament = await prisma.tournament.findFirst({
        where: {
          id: tournamentId,
        },
      });

      if (!findTournament) {
        return rep.status(404).send();
      }

      const teamTournamentPromises = TeamTournament.map(async (team) => {
        await prisma.teamTournament.create({
          data: {
            team: {
              connect: {
                id: team.teamId,
              },
            },
            tournament: {
              connect: {
                id: tournamentId,
              },
            },
          },
        });
      });

      await Promise.all(teamTournamentPromises);

      return rep.status(201).send();
    } catch (error) {
      console.error('Erro ao inserir equipes no torneio:', error);
      return rep.status(500).send();
    }
  });
}
