import { agentsRouter } from "@/modules/agents/server/procedure";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
