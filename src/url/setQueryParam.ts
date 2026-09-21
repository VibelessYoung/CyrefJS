export function setQueryParam(url: string, key: string, value: string): string {
  const hashIndex = url.indexOf("#");

  const hash = hashIndex === -1 ? "" : url.slice(hashIndex);

  const urlWithoutHash = hashIndex === -1 ? url : url.slice(0, hashIndex);

  const queryStart = urlWithoutHash.indexOf("?");

  if (queryStart === -1 && !urlWithoutHash.includes("/")) {
    const params = new URLSearchParams(urlWithoutHash);

    params.set(key, value);

    return `?${params.toString()}${hash}`;
  }

  const base =
    queryStart === -1 ? urlWithoutHash : urlWithoutHash.slice(0, queryStart);

  const query = queryStart === -1 ? "" : urlWithoutHash.slice(queryStart + 1);

  const params = new URLSearchParams(query);

  params.set(key, value);

  const newQuery = params.toString();

  return newQuery ? `${base}?${newQuery}${hash}` : `${base}${hash}`;
}
