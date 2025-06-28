import { agentsRouter } from "@/modules/agents/server/procedure";
import { meetingsRouter } from "@/modules/meetings/server/procedure";
import { createTRPCRouter } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
});

export type AppRouter = typeof appRouter;
