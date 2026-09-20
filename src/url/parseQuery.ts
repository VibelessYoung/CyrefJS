export function parseQuery(query: string): Record<string, string> {
  const params = new URLSearchParams(
    query.startsWith("?") ? query.slice(1) : query,
  );

  const result: Record<string, string> = {};

  for (const [key, value] of params) {
    result[key] = value;
  }

  return result;
}
