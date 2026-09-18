export function pad(
  value: string,
  length: number,
  chars: string = " ",
): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError("pad: length must be a non-negative integer");
  }

  const valueCharacters = Array.from(value);

  if (valueCharacters.length >= length || chars.length === 0) {
    return value;
  }

  const paddingLength = length - valueCharacters.length;
  const paddingCharacters = Array.from(chars);

  const leftLength = Math.floor(paddingLength / 2);
  const rightLength = paddingLength - leftLength;

  const leftPadding = Array.from(
    { length: leftLength },
    (_, index) => paddingCharacters[index % paddingCharacters.length],
  ).join("");

  const rightPadding = Array.from(
    { length: rightLength },
    (_, index) => paddingCharacters[index % paddingCharacters.length],
  ).join("");

  return leftPadding + value + rightPadding;
}
