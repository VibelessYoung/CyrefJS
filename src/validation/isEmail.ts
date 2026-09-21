export function isEmail(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const email = value.trim();

  if (email.length === 0) {
    return false;
  }

  const atIndex = email.indexOf("@");

  if (atIndex <= 0) {
    return false;
  }

  if (atIndex !== email.lastIndexOf("@")) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (domain.length === 0) {
    return false;
  }

  if (
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..")
  ) {
    return false;
  }

  if (domain.startsWith(".") || domain.endsWith(".") || domain.includes("..")) {
    return false;
  }

  if (!domain.includes(".")) {
    return false;
  }

  const labels = domain.split(".");

  if (
    labels.some(
      (label) =>
        label.length === 0 || label.startsWith("-") || label.endsWith("-"),
    )
  ) {
    return false;
  }

  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return false;
  }

  if (!labels.every((label) => /^[a-zA-Z0-9-]+$/.test(label))) {
    return false;
  }

  return true;
}
