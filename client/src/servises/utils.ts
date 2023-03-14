export function distinct<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
