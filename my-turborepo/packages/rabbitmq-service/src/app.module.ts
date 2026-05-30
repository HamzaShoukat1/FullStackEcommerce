import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { RabbitMQModule } from "./rabbitmq.module";
import { rabbitMQConfig } from "./rabbitmq.options";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RABBITMQ_SERVICE',
                ...rabbitMQConfig() 
            }

        ]),
        RabbitMQModule
    ]
})
export class AppModule { }
