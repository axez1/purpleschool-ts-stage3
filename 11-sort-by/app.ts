declare module 'sort-by' {
  type SortDirection = 'asc' | 'desc' | 1 | -1;

  interface SortSpecifier<T> {
    field: keyof T;
    direction?: SortDirection;
  }

  type SortCriteria<T> =
    | keyof T
    | ((item: T) => any)
    | SortSpecifier<T>
    | Array<keyof T | ((item: T) => any) | SortSpecifier<T>>;

  function sortBy<T>(array: readonly T[], ...criteria: SortCriteria<T>[]): T[];

  export = sortBy;
}
