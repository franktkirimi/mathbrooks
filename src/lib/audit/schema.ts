import { z } from "zod";

export const contactCaptureSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(1, "WhatsApp or phone number is required"),
  company: z.string().trim().min(1, "Company name is required"),
});

// Note: this repo's tsconfig has `strict: false` (strictNullChecks off), which Zod's type
// inference depends on — under this config, z.infer marks every field optional even though
// runtime validation still enforces them correctly. Prefer a hand-written type over z.infer
// when the required-ness needs to be reflected statically (see ContactCaptureForm.tsx).
export type ContactCaptureInput = z.infer<typeof contactCaptureSchema>;

export const answersSchema = z.record(z.string(), z.string());
