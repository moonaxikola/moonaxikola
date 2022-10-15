import { ClientNamespace, DEFAULT_REDIS_NAMESPACE } from '@liaoliaots/nestjs-redis';
import { Injectable, Inject } from '@nestjs/common';
import { parseNamespace } from '@liaoliaots/nestjs-redis/dist/utils';
import { ClientNotFoundError } from '@liaoliaots/nestjs-redis/dist/errors';

import { TaggedRedis } from './tagged-redis.client';
import { RedisClients } from './tagged-redis.interfaces';
import { REDIS_CLIENTS } from '@liaoliaots/nestjs-redis/dist/redis/redis.constants';

/**
 * Manager for redis clients.
 *
 * @public
 */
@Injectable()
export class RedisManager {
  constructor(@Inject(REDIS_CLIENTS) private readonly redisClients: RedisClients) {}

  /**
   * Retrieves all redis clients.
   */
  get clients(): ReadonlyMap<ClientNamespace, TaggedRedis> {
    return this.redisClients;
  }

  /**
   * Retrieves a redis client by namespace.
   */
  getClient(namespace: ClientNamespace = DEFAULT_REDIS_NAMESPACE): TaggedRedis {
    const client = this.redisClients.get(namespace);
    if (!client) throw new ClientNotFoundError(parseNamespace(namespace), 'redis');
    return client;
  }
}
