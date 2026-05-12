// lib/validation.ts
import { z } from 'zod'



export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type SigninData = z.infer<typeof signinSchema>