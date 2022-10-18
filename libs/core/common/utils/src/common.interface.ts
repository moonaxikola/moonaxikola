export type Optional<T> = T | null | undefined;

export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};
