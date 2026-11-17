
import type { HttpClient, HttpRequest } from './http-client';
import type { TokenStorage } from '../storage/token-storage';
import { ApiError } from '../errors/api-error';
import { translateApiError } from './api-error';

export class FetchHttpClient implements HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly tokenStorage: TokenStorage,
  ) {}

  async request<T>(
    endpoint: string,
    request: HttpRequest = {},
  ): Promise<T> {
    const token = request.requiresAuth === false
        ? null
        : await this.tokenStorage.get();

    const headers = new Headers(request.headers);

    if (request.body !== undefined) {
      headers.set('Content-Type', 'application/json');
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const baseUrl = this.baseUrl.replace(/\/+$/, '');
    const normalizedEndpoint = endpoint.startsWith('/')
      ? endpoint
      : `/${endpoint}`;

    let response: Response;

    try {
      response = await fetch(`${baseUrl}${normalizedEndpoint}`, {
        method: request.method ?? 'GET',
        headers,
        body:
          request.body === undefined
            ? undefined
            : JSON.stringify(request.body),
      });
    } catch {
      throw new Error(
        'Não foi possível conectar ao servidor. Verifique sua conexão.',
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof data.message === 'string'
          ? data.message
          : undefined;

      throw new ApiError(
        translateApiError(message),
        response.status,
        data,
      );
    }

    return data as T;
  }
}
