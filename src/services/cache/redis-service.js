import { createClient } from 'redis';

class CacheService {
  constructor() {
    this._client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
      },
    });

    this._client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    this._client.on('connect', () => {
      console.log('Redis connected');
    });
    this._client.connect();
  }

  async set(key, value, expirationInSecond = 3600) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    return await this._client.get(key);
  }

  async delete(key) {
    await this._client.del(key);
  }
}

export default CacheService;