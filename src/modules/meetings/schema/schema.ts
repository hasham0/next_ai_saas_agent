import { z } from "zod";

const meetingsInsertSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  agentId: z.string().min(1, {
    message: "Agent is required",
  }),
});

const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, {
    message: "Id is required",
  }),
});
export { meetingsInsertSchema, meetingsUpdateSchema };
