import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import createClient, {Redis} from "ioredis"
import 'dotenv/config'

@Injectable()
export class RedisService
  implements OnModuleInit, OnModuleDestroy
{
  private client!: Redis;

  async onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST_LOCAL,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined,
    });

    this.client.on('connect', () => {
      console.log('✅ Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('❌ Redis error', err);
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client?.quit();
  }
}
