import { z } from 'zod';

export const getDomainSchema = () => {
  return z.object({
    domain: z
      .string()
      .min(2, { message: 'Domain must be at least 2 characters long.' })
      .min(1, { message: 'Domain is required.' }),
  });
};

export type DomainSchemaType = z.infer<ReturnType<typeof getDomainSchema>>;
