import { TransactionalUseCase, UseCase } from '@moona/common/use-cases';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PrismaTransactionWrapper {
  constructor(private readonly prisma: PrismaService) {}

  wrapUseCase<I, O>(
    useCaseFactory: (prisma: Prisma.TransactionClient) => TransactionalUseCase<I, O>,
  ): UseCase<I, O> {
    return {
      execute: async (input: I): Promise<O> => {
        let onRollback = (payload: I, error: unknown) => Promise.resolve();
        let onCommit: TransactionalUseCase<I, O>['onCommit'];
        let result: O;

        try {
          await this.prisma.$transaction(async trx => {
            const useCase = useCaseFactory(trx);
            onRollback = useCase.onRollback;
            onCommit = useCase.onCommit;
            result = await useCase.execute(input);
          });

          await onCommit?.(input, result);

          return result;
        } catch (e) {
          onRollback(input, e);
          throw e;
        }
      },
    };
  }
}
