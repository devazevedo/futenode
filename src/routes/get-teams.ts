import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

interface TeamResponse {
  name: string;
  createdAt: string;
  popularName: string;
  sigla: string;
  stadium: {
    name: string;
    capacity: number;
    city: string;
    state: string;
    country: string;
  };
}

export async function getTeams(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/teams', {
    schema: {
      querystring: z.object({
        query: z.string(),
      }),
      response: {
        200: z.array(z.object({
          name: z.string(),
          createdAt: z.string(),
          popularName: z.string(),
          sigla: z.string(),
          stadium: z.object({
            name: z.string(),
            capacity: z.number(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
          }),
        })),
      },
    },
  }, async (req, rep) => {
    const { query } = req.query as { query: string };

    const teams = await prisma.team.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            popularName: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            stadium: {
              name: {
                startsWith: query,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        stadium: true,
      },
    });

    const formattedTeams: TeamResponse[] = teams.map(team => ({
      name: team.name,
      createdAt: team.createdAt!.toISOString(),
      popularName: team.popularName,
      sigla: team.sigla,
      stadium: {
        name: team.stadium.name,
        capacity: team.stadium.capacity,
        city: team.stadium.city,
        state: team.stadium.state,
        country: team.stadium.country,
      },
    }));

    return rep.status(200).send(formattedTeams);
  });
}
