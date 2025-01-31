import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    invoices: z.array(z.string().uuid()).optional(),
});

export type UserDto = z.infer<typeof UserSchema>;
