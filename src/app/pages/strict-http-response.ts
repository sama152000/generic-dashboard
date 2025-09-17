export interface StrictHttpResponse<T> {
  body: T;
  status: number;
  headers: any;
  statusText: string;
}
