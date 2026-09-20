export function addDays(date: Date, amount: number): Date {
  const result = new Date(date);

  result.setDate(result.getDate() + amount);

  return result;
}
