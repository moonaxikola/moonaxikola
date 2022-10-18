import { RedisKey } from 'ioredis';
import { ClientNamespace } from '@liaoliaots/nestjs-redis';

import { TaggedRedis } from './tagged-redis.client';

export type RedisClients = Map<ClientNamespace, TaggedRedis>;

export type RedisValue = string | number | Buffer;

export interface SetOptions {
  ttl?: number;
  tags?: string[];
}

export interface ITaggedRedis {
  set(key: RedisKey, value: RedisValue, options: SetOptions): Promise<void>;
  get(key: RedisKey, defaultValue?: RedisValue): Promise<RedisValue | null>;
  reset(tags?: string[]): Promise<void>;
  del(...args: RedisKey[]): Promise<void>;
}
