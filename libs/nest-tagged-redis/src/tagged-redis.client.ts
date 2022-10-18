import Redis, { RedisKey, RedisOptions } from 'ioredis';
import { removeDuplicates } from '@moona/core/common/utils';

import { ITaggedRedis, SetOptions, RedisValue } from './tagged-redis.interfaces';
import { TAGS_PREFIX } from './tagged-redis.constants';

export class TaggedRedis implements ITaggedRedis {
  public readonly ioredis: Redis;

  constructor(port: number, host: string, options: RedisOptions);
  constructor(path: string, options: RedisOptions);
  constructor(port: number, options: RedisOptions);
  constructor(port: number, host: string);
  constructor(options: RedisOptions);
  constructor(port: number);
  constructor(path: string);
  constructor();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(arg1?: any, arg2?: any, arg3?: any) {
    this.ioredis = new Redis(arg1, arg2, arg3);
  }

  async set(key: RedisKey, value: RedisValue, options: SetOptions = {}): Promise<void> {
    if (options.tags) {
      const multi = this.ioredis.multi();

      options.tags.forEach(tag => multi.sadd(this.getTagKey(tag), key));

      options.ttl ? multi.set(key, value, 'EX', options.ttl) : multi.set(key, value);

      await multi.exec();
    } else {
      options.ttl
        ? await this.ioredis.set(key, value, 'EX', options.ttl)
        : await this.ioredis.set(key, value);
    }
  }

  async get(key: RedisKey, defaultValue?: RedisValue): Promise<RedisValue | null> {
    const value = await this.ioredis.get(key);
    return value ?? defaultValue;
  }

  async del(...args: RedisKey[]): Promise<void> {
    await this.ioredis.del(...args);
  }

  async reset(tags?: string[]): Promise<void> {
    if (tags) {
      const keys = await Promise.all(tags.map(tag => this.ioredis.smembers(this.getTagKey(tag))))
        .then(k => k.flat())
        .then(k => removeDuplicates(k));

      const pipeline = this.ioredis.pipeline();

      keys.forEach(key => pipeline.del(key));
      tags.forEach(tag => pipeline.del(this.getTagKey(tag)));

      await pipeline.exec();
    } else {
      await this.ioredis.flushdb();
    }
  }

  private getTagKey(tag: string): string {
    return `${TAGS_PREFIX}${tag}`;
  }
}
