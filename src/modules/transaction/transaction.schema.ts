import { ItemType } from "@prisma/client";
import { z } from "zod";

export const transactionCreateSchema = z.object({
  id: z.string().nullish(),
  description: z.string().min(4),
  amount: z.number().min(4),
  categoryId: z.string().min(4),
  type: z.nativeEnum(ItemType),
  date: z.any().nullish(),
});
