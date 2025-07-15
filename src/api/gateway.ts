/**
 * PAXIS Client-Side API Gateway
 * Simplified version for frontend use
 */

interface APIResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
}

class APIGateway {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const { method = "GET", headers = {}, body } = config;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}`);
      }

      return {
        data,
        status: response.status,
        message: data.message,
      };
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "GET", headers });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "POST", body, headers });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "PUT", body, headers });
  }

  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE", headers });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: "PATCH", body, headers });
  }

  setAuthToken(token: string): void {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }

  removeAuthToken(): void {
    delete this.defaultHeaders.Authorization;
  }
}

export const gateway = new APIGateway();
export default gateway;
