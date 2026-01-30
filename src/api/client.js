const API_BASE_URL = "http://127.0.0.1:5000";

const tokenKey = 'helixpace_token';

export const auth = {
    getToken: () => localStorage.getItem(tokenKey),
    setToken: (token) => localStorage.setItem(tokenKey, token),
    clearToken: () => localStorage.removeItem(tokenKey),
    isAuthenticated: () => !!localStorage.getItem(tokenKey)
};

export async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = auth.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}