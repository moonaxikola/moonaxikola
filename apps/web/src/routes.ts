import { buildUrl } from '@moona/common/utils';

export function verifyEmail(email?: string, displayName?: string, token?: string) {
  const params: Record<string, string> = {};

  if (email) params.email = email;
  if (displayName) params.displayName = displayName;
  if (token) params.token = token;

  return buildUrl('/verify-email', params);
}
