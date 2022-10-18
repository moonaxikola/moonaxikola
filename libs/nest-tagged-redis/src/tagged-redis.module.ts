import { RedisModuleAsyncOptions, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { MissingConfigurationsError } from '@liaoliaots/nestjs-redis/dist/errors';
import { REDIS_CLIENTS, REDIS_MERGED_OPTIONS } from '@liaoliaots/nestjs-redis/dist/redis/redis.constants';
import { ERROR_LOG } from '@liaoliaots/nestjs-redis/dist/messages';
import { logger } from '@liaoliaots/nestjs-redis/dist/redis/redis-logger';
import { isError, isRejection, isResolution, parseNamespace } from '@liaoliaots/nestjs-redis/dist/utils';
import { Module, OnApplicationShutdown, DynamicModule, Provider } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { destroy } from './tagged-redis-client.utils';

import { RedisManager } from './tagged-redis-manager';
import { RedisClients } from './tagged-redis.interfaces';
import {
  createAsyncProviders,
  createOptionsProvider,
  createRedisClientProviders,
  mergedOptionsProvider,
  redisClientsProvider,
} from './tagged-redis.provider';

@Module({})
export class TaggedRedisModule implements OnApplicationShutdown {
  constructor(private moduleRef: ModuleRef) {}

  static forRoot(options: RedisModuleOptions = {}, isGlobal = true): DynamicModule {
    const redisClientProviders = createRedisClientProviders();

    const providers: Provider[] = [
      createOptionsProvider(options),
      redisClientsProvider,
      mergedOptionsProvider,
      RedisManager,
      ...redisClientProviders,
    ];

    return {
      global: isGlobal,
      module: TaggedRedisModule,
      providers,
      exports: [RedisManager, ...redisClientProviders],
    };
  }

  static forRootAsync(options: RedisModuleAsyncOptions, isGlobal = true): DynamicModule {
    if (!options.useFactory && !options.useClass && !options.useExisting) {
      throw new MissingConfigurationsError();
    }

    const redisClientProviders = createRedisClientProviders();
    const providers: Provider[] = [
      ...createAsyncProviders(options),
      redisClientsProvider,
      mergedOptionsProvider,
      RedisManager,
      ...redisClientProviders,
      ...(options.extraProviders ?? []),
    ];

    return {
      global: isGlobal,
      module: TaggedRedisModule,
      imports: options.imports,
      providers,
      exports: [RedisManager, ...redisClientProviders],
    };
  }

  async onApplicationShutdown(): Promise<void> {
    const { closeClient } = this.moduleRef.get<RedisModuleOptions>(REDIS_MERGED_OPTIONS);
    if (closeClient) {
      const results = await destroy(this.moduleRef.get<RedisClients>(REDIS_CLIENTS));
      results.forEach(([namespace, quit]) => {
        if (isResolution(namespace) && isRejection(quit) && isError(quit.reason)) {
          logger.error(ERROR_LOG(parseNamespace(namespace.value), quit.reason.message), quit.reason.stack);
        }
      });
    }
  }
}
