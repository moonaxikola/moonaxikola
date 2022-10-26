import { useMutation } from '@tanstack/react-query';
import { MutationOptions, useRequest } from '@moona/common/data-access';
import {
  SignUpResponse,
  SignUpRequest,
  SignInResponse,
  SignInRequest,
  RequestError,
  ConfirmEmailResponse,
  ConfirmEmailRequest,
} from '@moona/common/contracts';

export function useSignUp(options?: MutationOptions<SignUpResponse, RequestError, SignUpRequest>) {
  const request = useRequest();
  return useMutation(async data => request.post('/sign-up/email', data), options);
}

export function useSignIn(options?: MutationOptions<SignInResponse, RequestError, SignInRequest>) {
  const request = useRequest();
  return useMutation(async data => request.post('/sign-in/email', data), options);
}

export function useConfirmEmail(
  options?: MutationOptions<ConfirmEmailResponse, RequestError, ConfirmEmailRequest>,
) {
  const request = useRequest();
  return useMutation(async data => request.post('/email/confirm', data), options);
}
