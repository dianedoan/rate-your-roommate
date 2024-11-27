const API_URL = process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:5000/api'; // adjust port if different

export const authService = {
    register: async (userData) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Registration failed');
            }
            
            const result = data.body ? JSON.parse(data.body) : data;

            // Store token and user data
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            return result;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Login failed');
            }
            
            const result = data.body ? JSON.parse(data.body) : data;
            
            // Store token and user data
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            return result;
        } catch (error) {
            throw error;
        }
    },

    //method for protected API calls
    callProtectedApi: async (endpoint, options = {}) => {
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (!response.ok) {
                // Handle token expiration
                if (response.status === 401) {
                    authService.logout();
                }
                throw new Error(data.message || JSON.parse(data.body).message);
            }

            return data.body ? JSON.parse(data.body) : data;
        } catch (error) {
            throw error;
        }
    },

    // Add logout to authService
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    },

    // Add method to get current auth status
    getCurrentAuthState: () => {
        return {
            isAuthenticated: !!localStorage.getItem('token'),
            user: JSON.parse(localStorage.getItem('user') || 'null'),
            token: localStorage.getItem('token')
        };
    }
};