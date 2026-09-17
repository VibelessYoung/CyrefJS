function isUpperCase(char: string | undefined): boolean {
  return char !== undefined && /^\p{Lu}$/u.test(char);
}

function isLowerCase(char: string | undefined): boolean {
  return char !== undefined && /^\p{Ll}$/u.test(char);
}

function isNumber(char: string | undefined): boolean {
  return char !== undefined && /^\p{N}$/u.test(char);
}

function isWordCharacter(char: string | undefined): boolean {
  return char !== undefined && /^[\p{L}\p{N}\p{M}]$/u.test(char);
}

function getUppercaseRunStart(chars: string[], index: number): number {
  let start = index;

  while (start > 0 && isUpperCase(chars[start - 1])) {
    start--;
  }

  return start;
}

function getPrefixLength(chars: string[], index: number): number {
  let length = 0;
  let current = index - 1;

  while (
    current >= 0 &&
    (isLowerCase(chars[current]) || isNumber(chars[current]))
  ) {
    length++;
    current--;
  }

  return length;
}

function getUppercaseRunLength(chars: string[], start: number): number {
  let length = 0;

  while (start + length < chars.length && isUpperCase(chars[start + length])) {
    length++;
  }

  return length;
}

function isWordBoundary(chars: string[], index: number): boolean {
  const current = chars[index];
  const previous = chars[index - 1];
  const next = chars[index + 1];

  if (!current || !previous) {
    return false;
  }

  if (
    (isLowerCase(previous) || isNumber(previous)) &&
    isUpperCase(current) &&
    isLowerCase(next)
  ) {
    return true;
  }

  if (!isUpperCase(current)) {
    return false;
  }

  const runStart = getUppercaseRunStart(chars, index);

  if (index === runStart) {
    const runLength = getUppercaseRunLength(chars, runStart);

    const prefixLength = getPrefixLength(chars, runStart);

    if (runLength >= 2 && prefixLength >= 2) {
      return true;
    }

    return false;
  }

  if (isUpperCase(previous) && isLowerCase(next)) {
    const runLength = getUppercaseRunLength(chars, runStart);

    const prefixLength = getPrefixLength(chars, runStart);

    if (
      index === runStart + runLength - 1 &&
      (runStart === 0 || prefixLength >= 2)
    ) {
      return true;
    }
  }

  return false;
}

function tokenize(value: string): string[] {
  const chars = Array.from(value);
  const words: string[] = [];

  let currentWord = "";

  const pushCurrentWord = (): void => {
    if (currentWord.length > 0) {
      words.push(currentWord);
      currentWord = "";
    }
  };

  for (let index = 0; index < chars.length; index++) {
    const current = chars[index];

    if (!isWordCharacter(current)) {
      pushCurrentWord();
      continue;
    }

    if (isWordBoundary(chars, index)) {
      pushCurrentWord();
    }

    currentWord += current;
  }

  pushCurrentWord();

  return words;
}

export function camelCase(value: string): string {
  const words = tokenize(value);

  if (words.length === 0) {
    return "";
  }

  const [firstWord, ...remainingWords] = words;

  return (
    firstWord!.toLowerCase() +
    remainingWords
      .map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase())
      .join("")
  );
}
