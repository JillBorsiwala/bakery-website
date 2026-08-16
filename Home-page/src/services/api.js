const DEFAULT_API_BASE_URL = '/api/v1';

export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status ?? 0;
    this.details = options.details ?? null;
    this.cause = options.cause;
  }
}

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body,
  }).catch((error) => {
    throw new ApiError('Server unavailable', { cause: error });
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message = payload && typeof payload === 'object' && 'message' in payload
      ? payload.message
      : response.status >= 500
        ? 'Server unavailable'
        : 'Unable to load products';

    throw new ApiError(message, {
      status: response.status,
      details: payload,
    });
  }

  return payload;
}

export function unwrapSuccessData(payload) {
  if (payload && typeof payload === 'object' && 'success' in payload && payload.success && 'data' in payload) {
    return payload.data;
  }

  return payload;
}