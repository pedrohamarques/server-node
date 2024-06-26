import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { slugify } from "../utils/generate-slut";
import { prisma } from "../lib/prisma";

import type { FastifyInstance } from "fastify";

export async function createEvent(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post(
        "/events",
        {
            schema: {
                summary: "Create an event",
                tags: ["events"],
                body: z.object({
                    title: z
                        .string({
                            invalid_type_error:
                                "O título precisa ser uma string.",
                        })
                        .min(4),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(),
                }),
                response: {
                    201: z.object({
                        eventId: z.string().uuid(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { title, details, maximumAttendees } = request.body;

            const slug = slugify(title);

            const eventWithSameSlug = await prisma.event.findUnique({
                where: {
                    slug,
                },
            });

            if (eventWithSameSlug !== null) {
                throw new Error(
                    "Another event with same title already exists.",
                );
            }

            const event = await prisma.event.create({
                data: {
                    title,
                    details,
                    maximumAttendees,
                    slug,
                },
            });

            return reply.status(201).send({ eventId: event.id });
        },
    );
}
