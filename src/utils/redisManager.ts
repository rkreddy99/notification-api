import {Redis} from 'ioredis';

class RedisManager {
  private static instance: RedisManager;
  private readonly redisClient: Redis;

  private constructor() {
    console.log('Creating RedisManager instance...')
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    this.redisClient = new Redis(redisUrl);
    this.redisClient.on('error', (error) => {
      console.error('Redis connection error:', error);
      process.exit(1);
    });
    console.log('RedisManager instance created successfully.');
  }

  public static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  public getClient(): Redis {
    return this.redisClient;
  }
}

export const redisManager = RedisManager.getInstance();
