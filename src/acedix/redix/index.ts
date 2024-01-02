import { REDIS_HOST, REDIS_PORT, REDIS_PREFIX } from './config';
import RedisStore from 'connect-redis';
import {
  createClient,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

class Redix {
  host: string;
  port: number;
  prefix: string;
  client?: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  private static store: null | RedisStore = null;

  async initialize() {
    this.host = REDIS_HOST;
    this.port = REDIS_PORT;
    this.prefix = REDIS_PREFIX;

    this.client = createClient({
      socket: {
        host: this.host,
        port: this.port,
      },
    });

    try {
      await this.client.connect();
      console.log(
        '\x1b[36m%s\x1b[0m',
        `[SESSION] Connected to redis [${this.host}:${this.port}] Prefix is ${this.prefix}`,
      );
      return this.client;
    } catch (err) {
      throw err;
    }
  }

  getStore(): RedisStore {
    if (!Redix.store) {
      Redix.store = new RedisStore({
        client: this.client,
        prefix: `${this.prefix}:`,
      });
    }
    return Redix.store;
  }
}

export default new Redix();
