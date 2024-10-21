import z from "zod"

export const signupInputs = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string()
})

export const signinInputs = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string().optional()
})

export const createBlogInputs = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInputs = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type CreateBlogInputs = z.infer<typeof createBlogInputs>
export type UpdateBlogInputs = z.infer<typeof updateBlogInputs>