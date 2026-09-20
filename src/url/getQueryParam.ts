export function getQueryParam(url: string, key: string): string | null {
  const queryStart = url.indexOf("?");

  const query = queryStart === -1 ? url : url.slice(queryStart + 1);

  if (!query) {
    return null;
  }

  const params = new URLSearchParams(query);

  return params.get(key);
}
