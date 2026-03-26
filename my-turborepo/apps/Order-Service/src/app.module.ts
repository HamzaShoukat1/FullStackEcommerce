import { Controller, Get, Module } from '@nestjs/common';


@Controller() export class AppController {
    @Get()
    getHello(): string {
        return 'Hello from Order-Service!';
    };
    
}

@Module({
    controllers:[AppController]
})
export class AppModule {}
