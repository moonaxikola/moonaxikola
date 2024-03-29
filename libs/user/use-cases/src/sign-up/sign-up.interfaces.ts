import { CreateUserPayload, UserProps } from '@moona/user/domain';
import { UseCase } from '@moona/common/use-cases';

export type SignUpUseCasePayload = CreateUserPayload;

export type ISignUpUseCase = UseCase<SignUpUseCasePayload, UserProps>;
