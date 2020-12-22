export interface IPaginate<T> {
  page: number;
  pages: number;
  total: number;
  hasPre: boolean;
  hasNext: boolean;
  objects: T[];
}
