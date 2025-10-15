import { PaginatedResponseDto } from '../dtos/paginated-response.dto';

// Trong service của bạn
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResponseDto<T> {
  const totalPages = Math.ceil(total / limit);

  return new PaginatedResponseDto<T>({
    data,
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  });
}
