import { CreateUserPayload } from '@moona-backend/core/user/domain';
import { UseCase } from '@moona-backend/core/common/use-cases';

export type SignUpUseCasePayload = CreateUserPayload;

export type ISignUpUseCase = UseCase<SignUpUseCasePayload, void>;
