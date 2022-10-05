import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { z } from "zod";
import { t } from "./trpc";

export const userRoute = t.router({
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(5),
        email: z.string().min(5),
        password: z.string().min(5),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.prisma.user.findMany({
          where: {
            email: input.email,
          },
        });
        if (result.length === 0) {
          const users = await ctx.prisma.user.findMany();
          const hashPassword = await argon2.hash(input.password);
          const newUser = await ctx.prisma.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: hashPassword,
              ...(users.length === 0 && {
                role: Role.SUPER_ADMIN,
              }),
            },
          });

          return newUser;
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already taken",
          });
        }
      } catch (error) {
        throw error;
      }
    }),
});
