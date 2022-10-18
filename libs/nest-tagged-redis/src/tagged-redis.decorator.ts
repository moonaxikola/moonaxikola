import { Inject } from '@nestjs/common';
import { ClientNamespace, DEFAULT_REDIS_NAMESPACE } from '@liaoliaots/nestjs-redis';
import { isSymbol } from '@moona-backend/core/common/utils';

import { REDIS_MODULE_ID } from './tagged-redis.constants';

export const namespaces = new Map<ClientNamespace, ClientNamespace>();

/**
 * This decorator is used to mark a specific constructor parameter as a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
export const InjectRedis = (namespace: ClientNamespace = DEFAULT_REDIS_NAMESPACE): ParameterDecorator => {
  const token = getRedisToken(namespace);
  namespaces.set(namespace, token);
  return Inject(token);
};

/**
 * This function generates an injection token for a redis client.
 *
 * @param namespace - Client name
 *
 * @public
 */
const getRedisToken = (namespace: ClientNamespace): ClientNamespace => {
  if (isSymbol(namespace)) return namespace;
  return `${REDIS_MODULE_ID}:${namespace}`;
};
