import {z} from 'zod';


export const userSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2).nullable().optional(),
    email: z.string().email(),
    password: z.string().min(8),
})