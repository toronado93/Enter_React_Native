import { z } from "zod";

const SingInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 character"),
});

export { SingInSchema };
