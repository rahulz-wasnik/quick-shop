export interface AppResponse<T> {
  data: T;
  error?: Error;
}

export interface Error {
  type: string;
  message: string;
  nextSteps: string;
}
