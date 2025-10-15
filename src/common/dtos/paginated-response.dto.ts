export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;

  constructor(partial: Partial<PaginatedResponseDto<T>>) {
    Object.assign(this, partial);
  }
}
