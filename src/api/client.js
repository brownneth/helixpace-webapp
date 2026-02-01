const API_BASE_URL = "https://biocompute-py.onrender.com";

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
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            return data;
        } else {
            const text = await response.text();
            console.error("Non-JSON Response:", text); 
            throw new Error(`Server Error (${response.status}): The backend returned HTML instead of JSON. Check Render logs.`);
        }

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}