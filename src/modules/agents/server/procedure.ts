import db from "@/db";
import { agents } from "@/db/schema/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
});

export { agentsRouter };
