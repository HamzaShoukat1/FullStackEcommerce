import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    Get,
    UseGuards,
    Inject,
} from '@nestjs/common';


import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import type { Response, Request } from 'express';
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
    async me(@Req() req: Request) {
        const userId = (req as any).user.sub;
        return this.authService.currentUser(userId);
        // return this.authService.currentUser((req as any).user.sub);
    }


    //logout
    @UseGuards(IsAuthenticatedGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        res.clearCookie('accessToken', { ...ACCESS_COOKIE_OPTION });
        res.clearCookie('refreshToken', { ...REFRESH_COOKIE_OPTION });
        const userId = (req as any).user.sub;
        const refreshToken = req.cookies?.refreshToken;

        return this.authService.logout(userId, refreshToken);
    };

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