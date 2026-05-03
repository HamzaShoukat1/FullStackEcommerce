import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { IsAuthenticatedGuard, RolesGuard } from '@repo/shared';

@Module({
    imports: [AuthModule],
    providers: [IsAuthenticatedGuard, RolesGuard],
})
export class AppModule {}
