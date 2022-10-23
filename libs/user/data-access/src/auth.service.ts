import { useRequest, formatRequestError } from '@moona/common/data-access';
import { SignUpResponse, SignUpRequest, SignInResponse, SignInRequest } from '@moona/common/contracts';
import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  const request = useRequest();

  return useMutation<SignUpResponse, Error, SignUpRequest>(async data => {
    return request
      .post<SignUpResponse>('/sign-up/email', data)
      .then(response => response.data)
      .catch(e => {
        throw formatRequestError(e);
      });
  });
}

export function useSignIn() {
  const request = useRequest();

  return useMutation<SignInResponse, Error, SignInRequest>(async data => {
    return request
      .post<SignUpResponse>('/sign-in/email', data)
      .then(response => response.data)
      .catch(e => {
        throw formatRequestError(e);
      });
  });
}
