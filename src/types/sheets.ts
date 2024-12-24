export interface SheetError {
  code: string;
  message: string;
  status: number;
}

export interface SheetResponse<T> {
  data?: T;
  error?: SheetError;
  loading: boolean;
}
