const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit,
): Promise<{ status: number; data: T | null}> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;
        return { status: response.status, data };
    } catch (error) {
        throw new Error(`API request failed: ${error}`);
    }
}