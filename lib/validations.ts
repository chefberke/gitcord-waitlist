import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .max(255, 'Email is too long')
    .toLowerCase()
    .trim()
});

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};
