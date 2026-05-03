// lib/validation.ts
import {  z } from 'zod'

export const signupSchema = z.object({
  firstName: z.string().min(2, 'Name too short'),
  lastName: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be 6+ characters'),
})

export type SignupData = z.infer<typeof signupSchema>
export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type SigninData = z.infer<typeof signinSchema>