type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions extends Omit<RequestInit, 'method' | 'body' | 'headers'> {
    method?: HttpMethod;
    body?: Record<string, unknown> | FormData | string;
    queryParams?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
}

export async function fetcher<T>(url: string, options?: RequestOptions): Promise<T> {
    const { method = 'GET', body, queryParams, headers, ...rest } = options || {};

    const fullUrl = new URL(url);

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            fullUrl.searchParams.append(key, String(value));
        });
    }

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...rest,
    };

    if (body) {
        if (body instanceof FormData) {
            config.body = body;
            delete (config.headers as Record<string, string>)['Content-Type'];
        } else if (typeof body === 'object') {
            config.body = JSON.stringify(body);
        } else {
            config.body = body;
        }
    }

    try {
        const response = await fetch(fullUrl.toString(), config);

        if (!response.ok) {
            let errorMessage = `HTTP error! Status: ${String(response.status)}`;
            try {
                const errorData: unknown = await response.json();
                errorMessage += `, Data: ${JSON.stringify(errorData)}`;
            } catch {
                const errorText = await response.text();
                errorMessage += `, Text: ${errorText || 'No additional error info'}`;
            }
            throw new Error(errorMessage);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return (await response.json()) as T;
        }

        return {} as T;
    } catch (error) {
        console.error(`Fetcher error for ${url}:`, error);
        throw error;
    }
}
