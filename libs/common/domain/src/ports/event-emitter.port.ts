export interface EventEmitter<D = unknown> {
  dispatch(event: Event<D>): void;
}

export interface Event<D = unknown> {
  eventName: string;
  data?: D;
}

export interface EventListener<Event> {
  handle(event: Event): Promise<void> | void;
}
