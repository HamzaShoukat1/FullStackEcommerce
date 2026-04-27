import 'dotenv/config';
import { Injectable, UnauthorizedException, NotFoundException, ConflictException, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { prisma, User } from "@repo/auth-db";
import * as bcrypt from "bcrypt";
import { LoginDto, SignupDto, UserResponseDto } from "./dto";
import {
    getJwtAccessExpires,
    getJwtRefreshExpires,
    getRefreshTokenSecret,
    TokenPayload,
    getAccessTokenSecret
} from "@repo/shared";




@Injectable()

export class AuthService {
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) { }



    async signUp(dto: SignupDto) {

        const email = dto.email.trim().toLowerCase();
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            throw new ConflictException("Email already in use");
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                address: dto.address
            }
        });
        return this.responseWrapperwithTokens(user);
    };

    async signIn(dto: LoginDto) {
        const email = dto.email.trim().toLowerCase();
        const user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return this.responseWrapperwithTokens(user);
    };





    async logout(userId: number, refreshToken?: string) {
        if (!refreshToken) {

            await prisma.refreshToken.deleteMany({
                where: {
                    userId,
                    token: refreshToken
                }
            })
        }

        return { message: 'Logged out successfully' };
    };

    async refreshTokens(refreshToken: string) {
        let payload: TokenPayload;

        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: getRefreshTokenSecret(),
            });
        } catch {
            throw new UnauthorizedException("Invalid refresh token");
        }

        const userId = payload.sub;

        const matchedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken }
        });


        if (!matchedToken) {
            await prisma.refreshToken.deleteMany({
                where: { userId }
            });
            throw new UnauthorizedException("Refresh token reuse detected");
        }
        if (matchedToken.expiresAt < new Date()) {
            throw new UnauthorizedException("Refresh token expired");

        }

        await prisma.refreshToken.delete({
            where: { id: matchedToken.id }
        });

        // 👤 get user
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const tokens = await this.generateTokens(user);

        await prisma.refreshToken.create({
            data: {
                userId,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
        });

        return {
            tokens,
            user: this.mapUser(user as UserResponseDto)
        };
    }

    //token gen


    private async generateTokens(user: User): Promise<{

        accessToken: string;
        refreshToken: string;

    }> {
        const payload: TokenPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: getAccessTokenSecret(),
            expiresIn: getJwtAccessExpires() as any,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: getRefreshTokenSecret(),
            expiresIn: getJwtRefreshExpires() as any,
        });

        return {
            accessToken,
            refreshToken,
        };
    }










    private async responseWrapperwithTokens(user: User) {
        const tokens = await this.generateTokens(user);
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        })
        return {
            tokens,
            user: this.mapUser(user as UserResponseDto)


        };
    }

    private mapUser(user: UserResponseDto) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
            createdAt: user.createdAt,
        };
    }
}

