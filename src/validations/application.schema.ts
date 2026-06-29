import { z } from 'zod';

export const applicationSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  jobLink: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;