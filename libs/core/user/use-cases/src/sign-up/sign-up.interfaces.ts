import { CreateUserPayload } from '@moona/core/user/domain';
import { UseCase } from '@moona/core/common/use-cases';

export type SignUpUseCasePayload = CreateUserPayload;

export type ISignUpUseCase = UseCase<SignUpUseCasePayload, void>;
