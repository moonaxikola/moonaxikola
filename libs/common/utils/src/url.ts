export function buildUrl(url: string, params: Record<string, string>) {
  const searchParams = new URLSearchParams(params).toString();
  return url + (searchParams ? '?' + searchParams : '');
}
