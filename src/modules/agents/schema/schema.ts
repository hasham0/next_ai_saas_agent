import { z } from "zod";

const agentsInsertSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  instructions: z.string().min(1, {
    message: "instructions are required",
  }),
});

const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, {
    message: "Id is required",
  }),
});
export { agentsInsertSchema, agentsUpdateSchema };
