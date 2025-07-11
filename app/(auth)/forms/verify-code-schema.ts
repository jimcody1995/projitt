import { z } from 'zod';

export const getVerifyCodeSchema = () => {
  return z.object({
    code: z.string().min(6, { message: 'Enter the code correctly.' }),
  });
};

export type VerifyCodeSchemaType = z.infer<ReturnType<typeof getVerifyCodeSchema>>;
