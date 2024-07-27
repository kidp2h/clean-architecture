export interface Response<T> {
  code: number;
  message: string | null;
  data: T;
  timestamp: string;
}
