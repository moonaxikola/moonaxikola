import { useRequest, User } from '@moona/common/data-access';
import { useMutation } from '@tanstack/react-query';

import { SignUpRequest, SignUpResponse } from './sign-up.types';

export function useSignUp() {
  const request = useRequest();

  return useMutation<SignUpResponse, Error, SignUpRequest>(async data => {
    return request
      .post<SignUpResponse>('/sign-up/email', data)
      .then(async response => await User.factory(response.data));
  });
}
