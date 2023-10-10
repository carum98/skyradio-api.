import { z } from 'zod'

// Request schemas
export const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const AuthRegisterSchema = AuthLoginSchema.merge(z.object({
    name: z.string()
}))

export const AuthRefreshTokenSchema = z.object({
    refresh_token: z.string()
})

export type AuthLoginSchemaType = z.infer<typeof AuthLoginSchema>
export type AuthRegisterSchemaType = z.infer<typeof AuthRegisterSchema>
export type AuthRefreshTokenSchemaType = z.infer<typeof AuthRefreshTokenSchema>

// Response schemas
export const AuthTokenResponseSchema = z.object({
    token: z.string(),
    refreshToken: z.string(),
    expiredAt: z.number()
})

export type AuthTokenResponseSchemaType = z.infer<typeof AuthTokenResponseSchema>
