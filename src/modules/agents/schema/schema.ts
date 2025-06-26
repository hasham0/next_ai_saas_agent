import { z } from "zod";

const agentsInsertSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  instructions: z.string().min(1, {
    message: "instructions are required",
  }),
});

export { agentsInsertSchema };
