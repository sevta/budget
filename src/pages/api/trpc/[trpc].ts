import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "src/server/appRouter";
import { createContext } from "src/server/context";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
