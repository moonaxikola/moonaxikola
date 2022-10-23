/**
 * Returns `true` if the value is of type `symbol`.
 *
 * @param value - value to check
 */
export const isSymbol = (value: unknown): value is symbol => typeof value === 'symbol';

/**
 * Returns `true` if the value is of type `string`.
 *
 * @param value - value to check
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 *
 * @param value - value to check
 * @param values - values to check against
 */
export const isOneOf = <T>(value: T, ...values: T[]): value is T => values.includes(value);
