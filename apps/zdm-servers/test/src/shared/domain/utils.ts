export type IgnoreRecordType<T> = Omit<
  Pick<T, keyof T>,
  'createdAt' | 'updatedAt' | 'pullEvents'
>;
