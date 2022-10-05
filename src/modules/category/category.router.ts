import { t } from "src/server/trpc";
import { z } from "zod";

export const categoryRouter = t.router({
  list: t.procedure.query(async ({ ctx }) => {
    let resp = await ctx.prisma.category.findMany();

    return resp;
  }),

  listWithPagination: t.procedure
    .input(z.object({ take: z.number(), skip: z.number() }))
    .query(async ({ ctx, input }) => {
      let resp = await ctx.prisma.category.findMany({
        take: input.take,
        skip: input.skip,
      });
      let total = await ctx.prisma.category.count();

      return {
        data: resp,
        total,
      };
    }),

  delete: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        let resp = await ctx.prisma.category.delete({
          where: {
            id: input.id,
          },
        });
        return resp;
      } catch (error) {
        throw error;
      }
    }),

  deleteMany: t.procedure
    .input(
      z.object({
        id: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        let resp = await ctx.prisma.category.deleteMany({
          where: {
            id: {
              in: input.id,
            },
          },
        });

        return resp;
      } catch (error) {
        throw error;
      }
    }),

  create: t.procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        let resp = await ctx.prisma.category.create({
          data: {
            name: input.name,
            description: input.description,
            color: input.color,
          },
        });
        return resp;
      } catch (error) {
        throw error;
      }
    }),
});
