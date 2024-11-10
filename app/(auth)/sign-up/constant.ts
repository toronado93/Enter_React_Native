import { z } from "zod";

const SingUpSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password should be at least 8 character"),
  username: z
    .string()
    .min(4, "User name required and needs to be at least 4 character"),
});

export { SingUpSchema };
