import { createClient, RedisClientType } from 'redis';
import Singleton from './singleton';
import config from '../config';


class RedisService extends Singleton<RedisService> {
    private client: RedisClientType;

    constructor() {
        super();
        this.client = createClient({
            socket: {
                host: config.redis.host,
                port: config.redis.port,
            },
            password: config.redis.password,
        });

        this.client.on('connect', () => {
            console.log('Connected to Redis!');
        });

        this.client.on('error', (err) => {
            console.error('Redis connection error:', err);
        });

        this.client.connect();
    }

    // Set data in Redis cache
    public async setCache<T>(key: string, value: T, expirationInSeconds = 5 * 3600): Promise<void> {
        try {
            await this.client.set(key, JSON.stringify(value), {
                EX: expirationInSeconds,
            });
        } catch (error) {
            console.error('Error setting cache:', error);
        }
    }

    // Get data from Redis cache
    public async getCache<T>(key: string): Promise<T | {}> {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error getting cache:', error);
            return {};
        }
    }

    // Delete cache by key
    public async deleteCache(key: string): Promise<void> {
        try {
            await this.client.del(key);
            console.log(`Cache deleted: ${key}`);
        } catch (error) {
            console.error('Error deleting cache:', error);
        }
    }

    // Clear all cache
    public async clearAllCache(): Promise<void> {
        try {
            await this.client.flushAll();
            console.log('All cache cleared.');
        } catch (error) {
            console.error('Error clearing all cache:', error);
        }
    }
}

export default RedisService.getInstance();
