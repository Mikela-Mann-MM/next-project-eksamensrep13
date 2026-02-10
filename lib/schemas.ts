

import { z } from "zod";

export const loginSchema = z.object({
  // z.email findes ikke i zod → email skal være en string().email()
  email: z.string().email("Ugyldig email"),
  password: z.string().min(4, "Password er påkrævet og skal være mindst 4 tegn"),
});
