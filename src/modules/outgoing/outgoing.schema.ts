import { z } from "zod";

export const outgoingSchemaCreate = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
  price: z.number(),
});
