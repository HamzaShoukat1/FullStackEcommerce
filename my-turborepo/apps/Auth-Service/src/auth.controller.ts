import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    Get,
    UseGuards,
    Inject,
    UnauthorizedException,
} from '@nestjs/common';


import { AuthService } from './auth.service';
import type { AuthRequest } from '@repo/shared'
import { LoginDto, SignupDto } from './dto';
import type { Response } from 'express';
import { IsAuthenticatedGuard } from '@repo/shared';
// import { ACCESS_COOKIE_OPTION, REFRESH_COOKIE_OPTION } from './types';
import { ACCESS_COOKIE_OPTION, REFRESH_COOKIE_OPTION } from '@repo/shared';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AuthService) private readonly authService: AuthService) { }

    //signuo
    @Post('signup')
    async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.signUp(dto)
        this.setAuthCookies(res, result.tokens)
        return result.user

    };


    @Post('login')
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const result = await this.authService.signIn(dto)

        this.setAuthCookies(res, result.tokens)
        return result.user
    }



    //current user
    @UseGuards(IsAuthenticatedGuard)
    @Get('me')
    async me(@Req() req: AuthRequest) {
        const user = req.user
        return {
            id: user.sub,
            email: user.email,
            role: user.role
        }

        // return this.authService.currentUser((req as any).user.sub);
    }


    //logout
    @UseGuards(IsAuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
        res.clearCookie('accessToken', { ...ACCESS_COOKIE_OPTION });
        res.clearCookie('refreshToken', { ...REFRESH_COOKIE_OPTION });
        const userId = req.user.sub;
        const refreshToken = req.user.cookies?.refreshToken;

        return this.authService.logout(userId, refreshToken);
    };
    @UseGuards(IsAuthenticatedGuard)
    @Post('refresh')
    async refresh(@Req() req: AuthRequest, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.user.cookies?.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedException("Refresh token not found");
        }
        const result = await this.authService.refreshTokens(refreshToken);
        this.setAuthCookies(res, result.tokens);
        return result.user;
    }

    //cookie handler
    private setAuthCookies(res: Response, tokens: { accessToken: string, refreshToken: string }) {
        res.cookie('accessToken', tokens.accessToken, {
            ...ACCESS_COOKIE_OPTION
        });
        res.cookie('refreshToken', tokens.refreshToken, {

            ...REFRESH_COOKIE_OPTION
        });

    }


}