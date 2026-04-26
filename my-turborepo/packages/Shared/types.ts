import { CookieOptions } from "express";

export type TokenPayload = {
    sub: number;
    email: string;
    role: string;
};

const getEnvOrThrow = (key: string): string => {
    const value = process.env[key]?.trim();
    if (!value) {
        throw new Error(`${key} is not configured`);
    }
    return value;
};

export const getAccessTokenSecret = (): string => getEnvOrThrow('JWT_ACCESS_SECRET');
export const getRefreshTokenSecret = (): string => getEnvOrThrow('JWT_REFRESH_SECRET');
export const getJwtAccessExpires = (): string => getEnvOrThrow('JWT_ACCESS_EXPIRES')?.trim() || '15m';
export const getJwtRefreshExpires = (): string => getEnvOrThrow('JWT_REFRESH_EXPIRES')?.trim() || '7d';

// export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
// export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;
// export const JWT_ACCESS_EXPIRES = (process.env.JWT_ACCESS_EXPIRES ?? '15m') as any;
// export const JWT_REFRESH_EXPIRES = (process.env.JWT_REFRESH_EXPIRES ?? '7d') as any;

export const ACCESS_COOKIE_OPTION:CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
}
export const REFRESH_COOKIE_OPTION:CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}