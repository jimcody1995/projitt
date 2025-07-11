import { z } from 'zod';

export const getCompanySchema = () => {
  return z.object({
    logo: z
      .any()
      .refine(
        (file) => {
          if (!file) return true; // allow empty (optional)
          if (!(file instanceof File)) return false;
          const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
          return allowedTypes.includes(file.type);
        },
        { message: 'Logo must be an image file (png, jpg, jpeg, gif, webp).' }
      )
      .refine(
        (file) => {
          if (!file) return true; // allow empty (optional)
          if (!(file instanceof File)) return false;
          // 2MB max size
          return file.size <= 2 * 1024 * 1024;
        },
        { message: 'Logo must be less than 2MB.' }
      )
      .optional(),
    companySize: z.string().min(1, { message: 'Company size is required.' }),
    industry: z.string().min(1, { message: 'Industry is required.' }),
    phoneNumber: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .max(15, { message: 'Phone number must be at most 15 digits.' })
      .regex(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid.' }),
    websiteURL: z.string().url({ message: 'Website URL is required.' }),
  });
};

export type CompanySchemaType = z.infer<ReturnType<typeof getCompanySchema>>;
