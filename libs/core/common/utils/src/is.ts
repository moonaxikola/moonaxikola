/**
 * Returns `true` if the value is of type `symbol`.
 *
 * @param value - Any value
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

/**
 * Returns `true` if the value is of type `string`.
 *
 * @param value - Any value
 */
export const isString = (value: unknown): value is string => typeof value === 'string';
