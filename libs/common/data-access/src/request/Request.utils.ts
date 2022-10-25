import { AxiosError } from 'axios';
import { RequestError } from '@moona/common/contracts';

// TODO: improve error formatting
export function formatRequestError(error: AxiosError) {
  if (error.response) {
    return error.response.data as RequestError;
  }

  return error;
}
