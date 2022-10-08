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
        console.log({ error });
        throw error;
      }
    }),

  list: t.procedure
    .input(
      z.object({
        query: z.string(),
        from: z.any(),
        to: z.any(),
      })
    )
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
            description: {
              contains: input.query,
            },
            createdAt: {
              gte: input.from || undefined,
              lte: input.to || undefined,
            },
          },
        });

        let itemOutcome = await ctx.prisma.item.findMany({
          where: {
            type: ItemType.OUTCOME,
          },
          select: {
            amount: true,
          },
        });

        let itemIncome = await ctx.prisma.item.findMany({
          where: {
            type: ItemType.INCOME,
          },
          select: {
            amount: true,
          },
        });

        let totalOutcome = itemOutcome
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next);

        let totalIncome = itemIncome
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next);

        let subTotal = resp
          .map((item) => item.amount)
          .reduce((prev, next) => prev + next);

        let totalAccumulate = resp
          .map((item) =>
            item.type === ItemType.OUTCOME
              ? -Math.abs(item.amount)
              : item.amount
          )
          .reduce((prev, next) => prev + next);

        return {
          data: resp,
          totalIncome,
          totalOutcome,
          subTotal,
          totalAccumulate,
        };
      } catch (error) {
        throw error;
      }
    }),
});
