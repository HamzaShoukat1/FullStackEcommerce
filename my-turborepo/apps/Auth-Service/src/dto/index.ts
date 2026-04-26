import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
} from 'class-validator';

export class SignupDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least one uppercase letter and one number',
    })
    password!: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    lastName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;
}

export class LoginDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}
export class UserResponseDto {
    id!: number;
    email!: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    role!: string;
    refreshToken?: string;
    isEmailVerified!: boolean;
    createdAt!: Date;
}
export class AuthResponseDto {
    accessToken!: string;
    refreshToken!: string;
    user!: UserResponseDto;

}

export class RefreshTokenDto {
    @IsOptional()
    @IsString()
    refreshToken?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}
