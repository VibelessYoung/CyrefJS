const DEFAULT_OMISSION = "...";

export function truncate(
  value: string,
  length: number,
  omission: string = DEFAULT_OMISSION,
): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("truncate: length must be a non-negative integer");
  }

  if (value.length === 0) {
    return "";
  }

  const characters = Array.from(value);

  if (characters.length <= length) {
    return value;
  }

  const omissionCharacters = Array.from(omission);

  if (omissionCharacters.length >= length) {
    return omissionCharacters.slice(0, length).join("");
  }

  const remainingLength = length - omissionCharacters.length;

  return characters.slice(0, remainingLength).join("") + omission;
}
