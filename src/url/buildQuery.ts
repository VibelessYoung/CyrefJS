export function buildQuery(params: Record<string, string>): string {
  const searchParams = new URLSearchParams(params);

  return searchParams.toString();
}
