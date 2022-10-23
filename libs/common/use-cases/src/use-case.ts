export interface UseCase<Payload, Result> {
  execute(payload: Payload): Promise<Result>;
}

export interface TransactionalUseCase<Payload, Result> extends UseCase<Payload, Result> {
  onCommit?: (payload: Payload, result: Result) => Promise<void>;
  onRollback?: (payload: Payload, error: unknown) => Promise<void>;
}
