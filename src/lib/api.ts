class APIService {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "/api/v1";
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = endpoint.startsWith(this.baseUrl)
            ? endpoint
            : (endpoint.startsWith('/') ? endpoint : `${this.baseUrl}/${endpoint}`);

        const headers = { ...options.headers } as Record<string, string>;

        if (!(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {
            ...options,
            headers,
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }
        return response.json();
    }

    async get<T>(endpoint: string, params?: URLSearchParams, options?: RequestInit): Promise<T> {
        let url = `${this.baseUrl}/${endpoint}`;
        if (params) {
            url += `?${params.toString()}`;
        }
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        const isFormData = data instanceof FormData;
        return this.request<T>(`${this.baseUrl}/${endpoint}`, {
            ...options,
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
        const isFormData = data instanceof FormData;
        return this.request<T>(`${this.baseUrl}/${endpoint}`, {
            ...options,
            method: 'PUT',
            body: isFormData ? data : JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(`${this.baseUrl}/${endpoint}`, { ...options, method: 'DELETE' });
    }

}

export const api = new APIService();