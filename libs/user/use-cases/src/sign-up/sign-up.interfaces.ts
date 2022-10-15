import { CreateUserPayload, UserProps } from '@moona-backend/user/domain';
import { UseCase } from '@moona-backend/common/use-cases';

export type SignUpUseCasePayload = CreateUserPayload;

export type SignUpUseCaseResult = UserProps;

export type ISignUpUseCase = UseCase<SignUpUseCasePayload, SignUpUseCaseResult>;
