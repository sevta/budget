import { ItemType } from "@prisma/client";
import { t } from "src/server/trpc";
import { z } from "zod";
import { transactionCreateSchema } from "./transaction.schema";

export const transactionRouter = t.router({
  create: t.procedure
    .input(transactionCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        let resp = await ctx.prisma.item.create({
          data: {
            description: input.description,
            amount: input.amount,
            type: input.type,
            categoryId: input.categoryId,
          },
        });
        return resp;
      } catch (error) {
        throw error;
      }
    }),

  update: t.procedure
    .input(transactionCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        let resp = await ctx.prisma.item.update({
          where: {
            id: input.id || "",
          },
          data: {
            description: input.description,
            amount: input.amount,
            type: input.type,
            categoryId: input.categoryId,
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
        id: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        let resp = await ctx.prisma.item.deleteMany({
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

  accumulate: t.procedure
    .input(
      z
        .object({
          type: z.nativeEnum(ItemType).nullish(),
          withTotal: z.boolean().default(false),
        })
        .nullish()
    )
    .query(async ({ ctx, input }) => {
      try {
        type Resp = {
          [key: string]: number | object;
        };

        let resp: Resp = {};

        let items = await ctx.prisma.item.findMany({
          ...(input?.type && {
            where: {
              type: input?.type,
            },
          }),
          include: {
            category: true,
          },
        });

        if (items.length > 0) {
          items.map((item) => {
            resp[item!.category!.name] = {
              amount: items
                .filter((d) => d.category?.name === item.category?.name)
                .map((d) => d.amount)
                .reduce((prev, current) => prev + current),
              type: item.type,
            };
          });

          if (input?.withTotal)
            resp["total"] = items
              .map((d) =>
                d.type === "OUTCOME" ? -Math.abs(d.amount) : d.amount
              )
              .reduce((prev, current) => prev + current);
        }

        return resp;
      } catch (error) {
        throw error;
      }
    }),

  list: t.procedure
    .input(z.object({ query: z.string(), from: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      try {
        let resp = await ctx.prisma.item.findMany({
          include: {
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          where: {
            OR: [
              {
                description: {
                  contains: input.query,
                },
              },
            ],
          },
        });

        return resp;
      } catch (error) {
        throw error;
      }
    }),
});
