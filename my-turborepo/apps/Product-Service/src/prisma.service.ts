import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    console.log('[PrismaService] DATABASE_URL:', connectionString ? 'SET' : 'NOT SET');

    if (!connectionString) {
      throw new Error('Missing DATABASE_URL environment variable');
    }

    const adapter = new PrismaPg({ connectionString });
    console.log('[PrismaService] PrismaPg adapter created');

    super({
      adapter,
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    console.log('[PrismaService] PrismaClient initialized');
  }

  async onModuleInit() {
    try {
      console.log('[PrismaService] Connecting to database...');
      await this.$connect();
      console.log('[PrismaService] Connected successfully');
    } catch (error) {
      console.error('[PrismaService Connection Error]', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}