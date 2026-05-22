import { Module } from '@nestjs/common';
import { NotiModule } from './noti.module';
import { IsAuthenticatedGuard, RolesGuard } from '@repo/shared';

@Module({
    imports:[NotiModule],
    providers:[IsAuthenticatedGuard,RolesGuard]
})
export class AppModule {}
