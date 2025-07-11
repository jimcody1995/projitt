import { z } from 'zod';

export const getManageSchema = () => {
  return z.object({
    managementAreas: z
      .array(z.string())
      .min(1, { message: 'At least one management area is required.' }),
  });
};

export type ManageSchemaType = z.infer<ReturnType<typeof getManageSchema>>;
