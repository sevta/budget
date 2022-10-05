import { TRPCError } from "@trpc/server";
import { t } from "src/server/trpc";
import { z } from "zod";
import { outgoingSchemaCreate } from "./outgoing.schema";

export const outgoingRouter = t.router({
  list: t.procedure.query(async ({ ctx }) => {
    return await ctx.prisma.budget.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  create: t.procedure
    .input(outgoingSchemaCreate)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.budget.create({
          data: {
            name: input.title,
            description: input.description,
            price: Number(input.price),
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "someting wrong",
        });
      }
    }),
  delete: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const resp = await ctx.prisma.budget.delete({
          where: {
            id: input.id,
          },
        });
        return resp;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "someting wrong",
        });
      }
    }),
});
