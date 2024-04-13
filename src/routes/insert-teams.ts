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
          popularName: z.string(),
          sigla: z.string().length(3),
          stadium: z.object({
            name: z.string().min(4).max(100),
            capacity: z.number().int().positive(),
            city: z.string().min(4).max(100),
            state: z.string().length(2),
            country: z.string().length(2),
          }),
        })),
      }),
      response: {},
    },
  }, async (req, rep) => {
    const { clubs } = req.body;

    for (const club of clubs) {
      const findStadium = await prisma.stadium.findFirst({
        where: {
          name: club.stadium.name,
        },
      });

      let stadiumId;
      
      if (!findStadium) {
        const newStadium = await prisma.stadium.create({
          data: {
            name: club.stadium.name,
            capacity: club.stadium.capacity,
            city: club.stadium.city,
            state: club.stadium.state,
            country: club.stadium.country,
          },
        });
        stadiumId = newStadium.id;
      } else {
        stadiumId = findStadium.id;
      }

      await prisma.team.create({
        data: {
          name: club.name,
          createdAt: new Date(club.createdAt),
          popularName: club.popularName,
          sigla: club.sigla,
          stadium: {
            connect: {
              id: stadiumId,
            },
          },
        },
      });
    }

    return rep.status(201).send();
  });
}
