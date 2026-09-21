export function isURL(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const url = value.trim();

  if (url.length === 0) {
    return false;
  }

  try {
    const parsed = new URL(url);

    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
