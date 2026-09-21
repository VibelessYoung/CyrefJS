export function isStrongPassword(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  if (value.length < 8) {
    return false;
  }

  if (/\s/.test(value)) {
    return false;
  }

  if (!/[A-Z]/.test(value)) {
    return false;
  }

  if (!/[a-z]/.test(value)) {
    return false;
  }

  if (!/[0-9]/.test(value)) {
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/;'`~+=]/.test(value)) {
    return false;
  }

  return true;
}
