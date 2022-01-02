export function isObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null;
}

export function removeArrayDuplicates<T>(arrWithDuplicates: T[]): T[] {
  return Array.from(new Set(arrWithDuplicates));
}

export function roundTo2Decimals(num: number): number {
  return Math.round(num * 100) / 100;
}

export function randInt(from: number, to: number): number {
  const [realFrom, realTo] = [Math.min(from, to), Math.max(from, to)];
  return Math.floor(realFrom + Math.random() * (realTo - realFrom));
}
