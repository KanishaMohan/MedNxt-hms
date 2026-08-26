const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    'VITE_API_BASE_URL is not configured'
  );
}

interface ApiError {
  message: string;
  status?: number;
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }
  );

  if (!response.ok) {
    let message = 'Something went wrong';

    try {
      const errorData = await response.json();

      message =
        errorData?.message ||
        errorData?.error ||
        message;
    } catch {
      // Response does not contain JSON
    }

    const error: ApiError = {
      message,
      status: response.status,
    };

    throw error;
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const apiClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, {
      method: 'GET',
    });
  },

  post<T>(
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put<T>(
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch<T>(
    endpoint: string,
    data?: unknown
  ): Promise<T> {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, {
      method: 'DELETE',
    });
  },
};