import { categoryRouter } from "src/modules/category/category.router";
import { outgoingRouter } from "./../modules/outgoing/outgoing.router";
import { transactionRouter } from "./../modules/transaction/transaction.router";
import { t } from "./trpc";
import { userRoute } from "./userRoute";

export const appRouter = t.router({
  transaction: transactionRouter,
  category: categoryRouter,
  user: userRoute,
  outgoing: outgoingRouter,
});

export type AppRouter = typeof appRouter;
