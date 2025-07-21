import { z } from 'zod';

/**
 * Returns a Zod schema for sign-in form validation.
 * Validates email (required, valid email),
 * password (required, minimum 6 characters),
 * and optional rememberMe boolean flag.
 *
 * @returns {z.ZodObject} The Zod validation schema for sign-in
 */
export const getSigninSchema = (): z.ZodObject<any> => {
  return z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(1, { message: 'Password is required.' })
      .min(6, { message: 'Password must be at least 6 characters long.' }),
    rememberMe: z.boolean().optional(),
  });
};

/** Type representing the validated sign-in form data */
export type SigninSchemaType = z.infer<ReturnType<typeof getSigninSchema>>;
