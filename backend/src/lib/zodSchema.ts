import { z } from 'zod';

export const registerSchema = z.object({
    email : z.email(),
    password : z.string().min(6),
    userName : z.string().min(3)
});

export const loginSchema = z.object({
    identifier : z.string(),
    password : z.string().min(6)
})

export const createSessionSchema = z.object({
    topic : z.string().min(3),
    description : z.string().min(10)
});

export const endSessionSchema = z.object({
    sessionId : z.number()
});

