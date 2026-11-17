export interface HttpRequest {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: unknown;
  requiresAuth?: boolean;
}

export interface HttpClient {
  request<T>(
    endpoint: string,
    request?: HttpRequest,
  ): Promise<T>;
}