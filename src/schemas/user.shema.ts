import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  }),
  query: z.object({}),
  params: z.object({}),
});
export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const getUser = z.object({
  params: z.object({
    id: z
      .string()
      .min(2, 'Id must be at least 2 characters')
      .max(24, 'Id must be less than 25 characters'),
  }),
});
export type GetUser = z.infer<typeof getUser>;
