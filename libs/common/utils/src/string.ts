import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

export function randomString(length: number): string {
  return nanoid(length);
}

export function getParsedString(value: string): string {
  if (value === 'true' || value === 'false') {
    return JSON.parse(value);
  }

  if (value === 'undefined' || !value) {
    return '';
  }

  return value;
}
