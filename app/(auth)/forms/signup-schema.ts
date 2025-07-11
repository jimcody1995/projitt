import { z } from 'zod';

export const getSignupSchema = () => {
  return z.object({
    email: z
      .string()
      .email({ message: 'Please enter a valid email address.' })
      .min(1, { message: 'Email is required.' }),
    companyName: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .min(1, { message: 'Name is required.' }),
    firstName: z
      .string()
      .min(2, { message: 'First Name must be at least 2 characters long.' })
      .min(1, { message: 'First Name  is required.' }),
    lastName: z
      .string()
      .min(2, { message: 'Last Name must be at least 2 characters long.' })
      .min(1, { message: 'First Name  is required.' }),
    country: z.string().min(1, { message: 'Country is required.' }),
    phoneNumber: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .max(15, { message: 'Phone number must be at most 15 digits.' })
      .regex(/^\+?[0-9]{10,15}$/, { message: 'Phone number must be valid.' }),
    industry: z.string().min(1, { message: 'Industry is required.' }),
    companySize: z.string().min(1, { message: 'Company Size is required.' }),
    interests: z.array(z.string()).min(1, { message: 'At least one interest is required.' }),
    accept: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions.',
    }),
  });
};

export type SignupSchemaType = z.infer<ReturnType<typeof getSignupSchema>>;
