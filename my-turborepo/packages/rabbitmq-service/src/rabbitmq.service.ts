import { Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from "amqplib";
import { RABBITMQ_URL } from "./rabbitmq.constants";

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection!: amqp.ChannelModel
  private channel!: amqp.Channel;

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect(RABBITMQ_URL);
      this.channel = await this.connection.createChannel();

      console.log("Successfully connected to RabbitMQ");
    } catch (error) {
      console.error(" Failed to connect to RabbitMQ:", error);
      throw error;
    }
  }

  async publish(queue: string, message: any) {
    if (!this.channel) {
      throw new Error("Cannot publish message: RabbitMQ channel is not initialized.");
    }

    // Ensure queue exists (durable: true matches standard NestJS default microservices setup)
    await this.channel.assertQueue(queue, { durable: true });

    this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message))
    );
  }

  getChannel() {
    return this.channel;
  }

  


}
