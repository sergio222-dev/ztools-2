export function dateToUtc(date: Date): Date {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
}
