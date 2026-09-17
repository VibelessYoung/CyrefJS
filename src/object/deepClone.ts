export function deepClone<T>(value: T): T {
  const seen = new WeakMap<object, unknown>();

  const cloneProperties = (
    source: object,
    target: object,
    skipKeys?: Set<PropertyKey>,
  ): void => {
    for (const key of Reflect.ownKeys(source)) {
      if (skipKeys?.has(key)) continue;

      const descriptor = Object.getOwnPropertyDescriptor(source, key);

      if (!descriptor) continue;

      if ("value" in descriptor) {
        descriptor.value = clone(descriptor.value);
      }

      Object.defineProperty(target, key, descriptor);
    }
  };

  const clone = (current: unknown): unknown => {
    if (current === null || typeof current !== "object") {
      return current;
    }

    const existing = seen.get(current);

    if (existing !== undefined) {
      return existing;
    }

    if (current instanceof WeakMap) {
      throw new TypeError("Cannot clone WeakMap");
    }

    if (current instanceof WeakSet) {
      throw new TypeError("Cannot clone WeakSet");
    }

    if (current instanceof Date) {
      const result = new Date(current.getTime());

      seen.set(current, result);

      cloneProperties(current, result);

      return result;
    }

    if (current instanceof RegExp) {
      const result = new RegExp(current.source, current.flags);

      result.lastIndex = current.lastIndex;

      seen.set(current, result);

      cloneProperties(current, result);

      return result;
    }

    if (current instanceof Map) {
      const result = new Map();

      seen.set(current, result);

      for (const [key, value] of current) {
        result.set(clone(key), clone(value));
      }

      cloneProperties(current, result);

      return result;
    }

    if (current instanceof Set) {
      const result = new Set();

      seen.set(current, result);

      for (const value of current) {
        result.add(clone(value));
      }

      cloneProperties(current, result);

      return result;
    }

    if (Array.isArray(current)) {
      const result = new Array(current.length);

      seen.set(current, result);

      cloneProperties(current, result, new Set<PropertyKey>(["length"]));

      return result;
    }

    const result = Object.create(Object.getPrototypeOf(current)) as object;

    seen.set(current, result);

    cloneProperties(current, result);

    return result;
  };

  return clone(value) as T;
}
