export interface Hasher {
  hash(data: string): Promise<string>,
  compare(expected: string, actual: string): Promise<boolean>
}
