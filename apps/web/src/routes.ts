import { buildUrl } from '@moona/common/utils';

export function confirmEmail(email?: string, displayName?: string) {
  const params: Record<string, string> = {};

  if (email) params.email = email;
  if (displayName) params.displayName = displayName;

  return buildUrl('/confirm-email', params);
}

export function resetPassword(token?: string) {
  const params: Record<string, string> = {};

  if (token) params.token = token;

  return buildUrl('/reset-password', params);
}

export function home() {
  return '/';
}
