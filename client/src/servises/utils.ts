import { BASE_URL } from "./api";

export function distinct<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function getPhotoUrl(filename?: string) {
  return `${BASE_URL}/public/${filename}`;
}
