import {
  ClientNamespace,
  DEFAULT_REDIS_NAMESPACE,
  RedisClientOptions,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { addListeners } from '@liaoliaots/nestjs-redis/dist/redis/common';
import { END_EVENT, READY_EVENT } from '@liaoliaots/nestjs-redis/dist/constants';

import { TaggedRedis } from './tagged-redis.client';
import { RedisClients } from './tagged-redis.interfaces';

export const createClient = (
  { namespace, url, path, onClientCreated, ...redisOptions }: RedisClientOptions,
  { readyLog, errorLog }: RedisModuleOptions,
): TaggedRedis => {
  let client: TaggedRedis;
  if (url) client = new TaggedRedis(url, redisOptions);
  else if (path) client = new TaggedRedis(path, redisOptions);
  else client = new TaggedRedis(redisOptions);
  addListeners({
    namespace: namespace ?? DEFAULT_REDIS_NAMESPACE,
    instance: client.ioredis,
    readyLog,
    errorLog,
  });
  if (onClientCreated) onClientCreated(client.ioredis);
  return client;
};

export const destroy = async (clients: RedisClients) => {
  const promises: Promise<[PromiseSettledResult<ClientNamespace>, PromiseSettledResult<'OK'>]>[] = [];
  clients.forEach((client, namespace) => {
    if (client.ioredis.status === END_EVENT) return;
    if (client.ioredis.status === READY_EVENT) {
      promises.push(Promise.allSettled([namespace, client.ioredis.quit()]));
      return;
    }
    client.ioredis.disconnect();
  });

  return await Promise.all(promises);
};
