import { UseCase } from './use-case';

export interface TransactionalUseCase<Payload, Result> extends UseCase<Payload, Result> {
  onCommit?: (result: Result, port: Payload) => Promise<void>;
  onRollback?: (error: Error, port: Payload) => Promise<void>;
}
